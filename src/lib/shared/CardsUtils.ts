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
    if (text.length !== 2) {
      return false
    }

    return text.match(/^[ATJQK2-9]{1}[CDHS♦️♣️♥️♠️]{1}$/) !== null
  }
  suitEmojiToAsci(suitEmoji: string): string {
    switch (suitEmoji) {
      case '♦️':
        return 'D'
      case '♣️':
        return 'C'
      case '♥️':
        return 'H'
      case '♠️':
        return 'S'
      default:
        throw Error(`Invalid suit: ${suitEmoji}`)
    }
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
      throw Error('Passed card is not a valid card')
    }
    
    const rank = card[0]
    const suit = card[1]
    
    if (suit.match(/^[HSCD]$/)) {
      return card
    } else {
      return rank + this.suitEmojiToAsci(suit)
    }
  }
  validateDeck(text: string): SuccessfulValidation | FailedValidation {
    const cardsChecked: string[] = []
    for (const cardString of text.split(/\s+/)) {
      if (!this.isValidCard(cardString)) {
        return {
          success: false,
          reason: `Invalid input card after splitting by blank space: ${cardString}`
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
}

export const CardsUtils = new _CardsUtils()
