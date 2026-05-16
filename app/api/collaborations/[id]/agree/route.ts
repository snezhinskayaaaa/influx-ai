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
    // (double-freeze via concurrent requests)
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const collaboration = await tx.collaboration.findUnique({
        where: { id },
        include: {
          campaign: {
            include: { brand: { select: { id: true, userId: true, balance: true, frozenBalance: true } } },
          },
          influencer: { select: { id: true, userId: true } },
        },
      })

      if (!collaboration) {
        throw new Error('NOT_FOUND')
      }

      // Only brand owner or admin can trigger the freeze
      if (collaboration.campaign.brand.userId !== user.userId && user.role !== 'ADMIN') {
        throw new Error('ACCESS_DENIED')
      }

      if (collaboration.status !== 'NEGOTIATING') {
        throw new Error('INVALID_STATUS')
      }

      if (!collaboration.brandAgreed || !collaboration.influencerAgreed) {
        throw new Error('PARTIES_NOT_AGREED')
      }

      if (!collaboration.agreedPrice) {
        throw new Error('NO_AGREED_PRICE')
      }

      const brand = collaboration.campaign.brand
      if (brand.balance < collaboration.agreedPrice) {
        throw new Error('INSUFFICIENT_BALANCE')
      }

      await tx.brand.update({
        where: { id: brand.id },
        data: {
          balance: { decrement: collaboration.agreedPrice },
          frozenBalance: { increment: collaboration.agreedPrice },
        },
      })

      const updated = await tx.collaboration.update({
        where: { id },
        data: {
          status: 'AGREED',
          frozenAt: new Date(),
        },
      })

      await tx.transaction.create({
        data: {
          userId: brand.userId,
          type: 'CAMPAIGN_FREEZE',
          amount: collaboration.agreedPrice,
          description: `Funds frozen for collaboration on campaign "${collaboration.campaign.title || 'Untitled'}"`,
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
          return NextResponse.json({ error: 'Collaboration must be in negotiating status' }, { status: 400 })
        case 'PARTIES_NOT_AGREED':
          return NextResponse.json({ error: 'Both parties must agree first' }, { status: 400 })
        case 'NO_AGREED_PRICE':
          return NextResponse.json({ error: 'Agreed price must be set before confirming' }, { status: 400 })
        case 'INSUFFICIENT_BALANCE':
          return NextResponse.json(
            { error: 'Insufficient balance to confirm this collaboration. Please top up your wallet.' },
            { status: 400 },
          )
      }
    }
    console.error('POST /api/collaborations/[id]/agree error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
