import { json } from '@sveltejs/kit'
import { MessageEncodingService } from '../../../server/MessageEncodingService'
import { CardsUtils } from '$lib/shared/CardsUtils'

export const POST = async ({ request }) => {
  const { cards } = await request.json() as { cards: string[] }

  const convertedCards = cards.map((card) => CardsUtils.convertCardIntoAsciFormat(card))
  const decodedText = MessageEncodingService.decode(convertedCards)
  return json({
    message: decodedText
  })
}