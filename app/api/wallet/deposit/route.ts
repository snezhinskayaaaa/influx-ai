import { NextRequest, NextResponse } from 'next/server'

/**
 * SECURITY: Direct deposits are disabled.
 *
 * Deposits MUST only be credited via the payment provider webhook
 * (e.g. POST /api/webhooks/0xprocessing) after the payment processor
 * confirms a successful on-chain transaction. Allowing direct balance
 * increments from a client-facing endpoint would let any authenticated
 * user grant themselves arbitrary funds.
 *
 * When the 0xprocessing webhook integration is implemented, the webhook
 * handler should:
 *  1. Verify the request signature from 0xprocessing.
 *  2. Validate the payment status is "completed".
 *  3. Credit the brand's balance inside a Prisma transaction.
 *  4. Create a DEPOSIT transaction record.
 */
export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { error: 'Deposits are processed via payment provider webhooks only' },
    { status: 403 },
  )
}
