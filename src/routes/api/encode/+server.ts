import { json } from '@sveltejs/kit'
import { MessageEncodingService } from '../../../server/MessageEncodingService'

export const POST = async ({ request }) => {
  const { message } = await request.json() as { message: string }

  const cards = MessageEncodingService.encode(message)
  return json({
    cards
  })
}