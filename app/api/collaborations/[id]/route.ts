import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

const MAX_AGREED_PRICE_DOLLARS = 1_000_000 // $1M upper bound

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const collaboration = await prisma.collaboration.findUnique({
      where: { id },
      include: {
        campaign: {
          include: { brand: { select: { id: true, companyName: true, industry: true, userId: true } } },
        },
        influencer: { select: { id: true, handle: true, instagramFollowers: true, pricePerPost: true, userId: true } },
      },
    })

    if (!collaboration) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 })
    }

    const isBrandOwner = collaboration.campaign.brand.userId === user.userId
    const isInfluencer = collaboration.influencer.userId === user.userId
    const isAdmin = user.role === 'ADMIN'

    if (!isBrandOwner && !isInfluencer && !isAdmin) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    return NextResponse.json({ collaboration })
  } catch (error) {
    console.error('GET /api/collaborations/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const collaboration = await prisma.collaboration.findUnique({
      where: { id },
      include: {
        campaign: { include: { brand: { select: { id: true, userId: true } } } },
        influencer: { select: { userId: true } },
      },
    })

    if (!collaboration) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 })
    }

    const isBrandOwner = collaboration.campaign.brand.userId === user.userId
    const isInfluencer = collaboration.influencer.userId === user.userId
    const isAdmin = user.role === 'ADMIN'

    if (!isBrandOwner && !isInfluencer && !isAdmin) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const body = await request.json()
    const updateData: Record<string, unknown> = {}

    // Brand can set agreedPrice and brandAgreed, and accept application (NEGOTIATING)
    if (isBrandOwner || isAdmin) {
      if (body.agreedPrice !== undefined) {
        if (typeof body.agreedPrice !== 'number' || body.agreedPrice <= 0) {
          return NextResponse.json({ error: 'Agreed price must be a positive number' }, { status: 400 })
        }
        if (body.agreedPrice > MAX_AGREED_PRICE_DOLLARS) {
          return NextResponse.json({ error: `Agreed price must not exceed $${MAX_AGREED_PRICE_DOLLARS.toLocaleString()}` }, { status: 400 })
        }
        updateData.agreedPrice = Math.round(body.agreedPrice * 100)
      }
      if (body.brandAgreed !== undefined) {
        updateData.brandAgreed = body.brandAgreed
      }
      if (body.status === 'NEGOTIATING' && collaboration.status === 'APPLIED') {
        updateData.status = 'NEGOTIATING'
      }
    }

    // Influencer can set influencerAgreed
    if (isInfluencer || isAdmin) {
      if (body.influencerAgreed !== undefined) {
        updateData.influencerAgreed = body.influencerAgreed
      }
    }

    // Either party can cancel; if funds were frozen, unfreeze them
    if (body.status === 'CANCELLED') {
      const shouldUnfreeze =
        (collaboration.status === 'AGREED' || collaboration.status === 'IN_PROGRESS') &&
        collaboration.agreedPrice !== null &&
        collaboration.agreedPrice > 0

      if (shouldUnfreeze) {
        updateData.status = 'CANCELLED'

        const updated = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          await tx.brand.update({
            where: { id: collaboration.campaign.brand.id },
            data: {
              balance: { increment: collaboration.agreedPrice! },
              frozenBalance: { decrement: collaboration.agreedPrice! },
            },
          })

          const cancelledCollab = await tx.collaboration.update({
            where: { id },
            data: updateData,
          })

          await tx.transaction.create({
            data: {
              userId: collaboration.campaign.brand.userId,
              type: 'CAMPAIGN_UNFREEZE',
              amount: collaboration.agreedPrice!,
              description: `Funds unfrozen due to collaboration cancellation`,
              referenceId: collaboration.id,
            },
          })

          return cancelledCollab
        })

        return NextResponse.json({ collaboration: updated })
      }

      updateData.status = 'CANCELLED'
    }

    // Either party or admin can update deliverables
    if (body.deliverables !== undefined) {
      if (typeof body.deliverables === 'string') {
        updateData.deliverables = body.deliverables.split('\n').map((d: string) => d.trim()).filter((d: string) => d.length > 0)
      } else if (Array.isArray(body.deliverables)) {
        updateData.deliverables = body.deliverables
      }
    }

    // Brand can move to IN_PROGRESS after agreement
    if (body.status === 'IN_PROGRESS' && collaboration.status === 'AGREED' && (isBrandOwner || isAdmin)) {
      updateData.status = 'IN_PROGRESS'
    }

    const updated = await prisma.collaboration.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ collaboration: updated })
  } catch (error) {
    console.error('PATCH /api/collaborations/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
