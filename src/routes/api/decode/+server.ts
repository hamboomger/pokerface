import { json } from '@sveltejs/kit'
import { MessageEncodingService } from '../../../server/MessageEncodingService'

export const POST = async ({ request }) => {
  const { cards } = await request.json() as { cards: string[] }

  const decodedText = MessageEncodingService.decode(cards)
  return json({
    message: decodedText
  })
}