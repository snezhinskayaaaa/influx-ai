import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

const MAX_WITHDRAWAL_DOLLARS = 10_000 // $10,000 per transaction

// TODO: Integrate with 0xprocessing.com for actual payout
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (user.role !== 'INFLUENCER') {
      return NextResponse.json({ error: 'Only influencers can withdraw funds' }, { status: 403 })
    }

    const body = await request.json()
    const { amount } = body

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number' }, { status: 400 })
    }

    if (amount > MAX_WITHDRAWAL_DOLLARS) {
      return NextResponse.json(
        { error: `Maximum withdrawal per transaction is $${MAX_WITHDRAWAL_DOLLARS.toLocaleString()}` },
        { status: 400 },
      )
    }

    const amountCents = Math.round(amount * 100)
    const fee = Math.round(amountCents * 0.03) // 3% withdrawal fee
    const payout = amountCents - fee

    // All reads and balance checks inside the transaction to prevent race conditions
    // (double-withdrawal via concurrent requests)
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const influencer = await tx.influencer.findUnique({
        where: { userId: user.userId },
      })

      if (!influencer) {
        throw new Error('PROFILE_NOT_FOUND')
      }

      if (influencer.balance < amountCents) {
        throw new Error('INSUFFICIENT_BALANCE')
      }

      const updated = await tx.influencer.update({
        where: { id: influencer.id },
        data: { balance: { decrement: amountCents } },
      })

      await tx.transaction.create({
        data: {
          userId: user.userId,
          type: 'WITHDRAWAL',
          amount: amountCents,
          fee,
          description: `Withdrawal of $${amount.toFixed(2)} (fee: $${(fee / 100).toFixed(2)}, payout: $${(payout / 100).toFixed(2)})`,
        },
      })

      return updated
    })

    return NextResponse.json({
      payout,
      fee,
      remainingBalance: result.balance,
    })
  } catch (error) {
    // Handle known error cases from inside the transaction
    if (error instanceof Error) {
      switch (error.message) {
        case 'PROFILE_NOT_FOUND':
          return NextResponse.json({ error: 'Influencer profile not found' }, { status: 404 })
        case 'INSUFFICIENT_BALANCE':
          return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
      }
    }
    console.error('POST /api/wallet/withdraw error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
