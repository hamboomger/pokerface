type SuccessfulValidation = {
  success: true
}
type FailedValidation = {
  success: false
  reason: string
}

class _CardsUtils {
  get standardDeck() {
    return [
      'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
      'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS'
    ]
  }
  isValidCard(text: string): boolean {
    if (this.visibleLength(text) !== 2) {
      return false
    }
    
    const rank = text[0]
    const suit = text[1]

    // Check if rank is valid
    if (!rank.match(/^[AKQJT2-9]$/)) {
      return false
    }

    // Check if suit is valid - either ASCII or emoji
    if (!suit.match(/^[HSCD]$/) && !suit.match(/[♠️♥️♣️♦️]/u)) {
      return false
    }

    return true
  }
  suitEmojiToAsci(suitEmoji: string): string {
    if (suitEmoji.match(/[♠️]/u)) {
      return 'S'
    }
    if (suitEmoji.match(/[♦️]/u)) {
      return 'D'
    }
    if (suitEmoji.match(/[♥️]/u)) {
      return 'H'
    }
    if (suitEmoji.match(/[♣️]/u)) {
      return 'C'
    }
    throw Error(`Invalid suit: ${suitEmoji}`)
  }
  suitAsciToEmoji(suitInAsci: string): string {
    switch (suitInAsci) {
      case 'D':
        return '♦️'
      case 'C':
        return '♣️'
      case 'H':
        return '♥️'
      case 'S':
        return '♠️'
      default:
        throw Error(`Invalid suit: ${suitInAsci}`)
    }
  }
  convertCardIntoAsciFormat(card: string): string {
    if (!this.isValidCard(card)) {
      throw Error(`Invalid card: ${card}`)
    }
    
    const rank = card[0]
    const suit = card[1]
    
    if (suit.match(/^[HSCD]$/)) {
      return card
    } else {
      return rank + this.suitEmojiToAsci(suit)
    }
  }
  normalizeDeck(deckStr: string): string[] {
    const deck = deckStr.replace(/\s+/g, ' ').split(' ')
    return deck.map((card) => this.convertCardIntoAsciFormat(card))
  }
  validateDeck(text: string): SuccessfulValidation | FailedValidation {
    if (text.trim().length === 0) {
      return { success: true }
    }

    const cardsChecked: string[] = []
    
    let cardsStrings = text.trim().split(/\s+/)
    // skip last element if it's only one character - 
    //    user is in the process of writing
    if (cardsStrings.at(-1)?.length === 1) {
      cardsStrings = cardsStrings.slice(0, -1)
    }

    for (const cardString of cardsStrings) {
      if (!this.isValidCard(cardString)) {
        return {
          success: false,
          reason: `Invalid card: ${cardString}`
        }
      }
      
      const asciCard = this.convertCardIntoAsciFormat(cardString)
      if (cardsChecked.includes(asciCard)) {
        return {
          success: false,
          reason: `Same card cannot repeat twice: ${asciCard}`
        }
      }
      
      cardsChecked.push(asciCard)
    }
    
    return {
      success: true
    }
  }
  countCardsInAText(text: string): number {
    if (!this.validateDeck(text)) {
      throw Error('Invalid deck: ' + text)
    }
    const cardsText = text.split(/\s+/)
    return cardsText.length
  }
  private visibleLength(str: string): number {
    return [...new Intl.Segmenter().segment(str)].length
  }
}

export const CardsUtils = new _CardsUtils()
