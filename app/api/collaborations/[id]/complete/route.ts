import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // All reads and checks inside the transaction to prevent race conditions
    // (double-completion via concurrent requests)
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const collaboration = await tx.collaboration.findUnique({
        where: { id },
        include: {
          campaign: {
            include: { brand: { select: { id: true, userId: true } } },
          },
          influencer: { select: { id: true, userId: true } },
        },
      })

      if (!collaboration) {
        throw new Error('NOT_FOUND')
      }

      // Only brand owner or admin can mark as complete
      if (collaboration.campaign.brand.userId !== user.userId && user.role !== 'ADMIN') {
        throw new Error('ACCESS_DENIED')
      }

      if (collaboration.status !== 'AGREED' && collaboration.status !== 'IN_PROGRESS') {
        throw new Error('INVALID_STATUS')
      }

      if (!collaboration.agreedPrice) {
        throw new Error('NO_AGREED_PRICE')
      }

      await tx.brand.update({
        where: { id: collaboration.campaign.brand.id },
        data: {
          frozenBalance: { decrement: collaboration.agreedPrice },
        },
      })

      await tx.influencer.update({
        where: { id: collaboration.influencer.id },
        data: {
          balance: { increment: collaboration.agreedPrice },
        },
      })

      const updated = await tx.collaboration.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })

      await tx.transaction.create({
        data: {
          userId: collaboration.campaign.brand.userId,
          type: 'CAMPAIGN_PAYOUT',
          amount: collaboration.agreedPrice,
          description: `Payment to influencer for collaboration`,
          referenceId: collaboration.id,
        },
      })

      await tx.transaction.create({
        data: {
          userId: collaboration.influencer.userId,
          type: 'CAMPAIGN_PAYOUT',
          amount: collaboration.agreedPrice,
          description: `Earnings from collaboration`,
          referenceId: collaboration.id,
        },
      })

      return updated
    })

    return NextResponse.json({ collaboration: result })
  } catch (error) {
    // Handle known error cases from inside the transaction
    if (error instanceof Error) {
      switch (error.message) {
        case 'NOT_FOUND':
          return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 })
        case 'ACCESS_DENIED':
          return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        case 'INVALID_STATUS':
          return NextResponse.json({ error: 'Collaboration must be agreed or in progress to complete' }, { status: 400 })
        case 'NO_AGREED_PRICE':
          return NextResponse.json({ error: 'No agreed price set' }, { status: 400 })
      }
    }
    console.error('POST /api/collaborations/[id]/complete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
