class _ClientUtils {
  replaceCardsWithEmojis(cards: string[]) {
    const getEmojiSuit = (suit: string) => {
      switch (suit) {
        case 'H':
          return '♥️'
        case 'D':
          return '♦️'
        case 'C':
          return '♣️'
        case 'S':
          return '♠️'
      }
    }

    return cards.map((card) => {
      const rank = card[0]
      const suit = card[1]

      return rank + getEmojiSuit(suit)
    })
  }
}

export const ClientUtils = new _ClientUtils()

