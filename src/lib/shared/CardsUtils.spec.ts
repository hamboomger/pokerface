import { CardsUtils } from './CardsUtils'
import { describe, it, expect, test } from 'vitest'

describe('CardsUtils.validateDeck', () => {
  it('should validate empty deck', () => {
    expect(CardsUtils.validateDeck('')).toEqual({ success: true })
    expect(CardsUtils.validateDeck('   ')).toEqual({ success: true })
  })

  it('should validate deck with valid cards in ASCII format', () => {
    expect(CardsUtils.validateDeck('AC 2D 3H')).toEqual({ success: true })
    expect(CardsUtils.validateDeck('TC JD QH KS')).toEqual({ success: true })
  })

  it('should validate deck with valid cards in emoji format', () => {
    expect(CardsUtils.validateDeck('A♣️ 2♦️ 3♥️')).toEqual({ success: true })
    expect(CardsUtils.validateDeck('T♣️ J♦️ Q♥️ K♠️')).toEqual({ success: true })
  })

  it('should validate deck with mixed format cards', () => {
    expect(CardsUtils.validateDeck('AC 2♦️ 3H K♠️')).toEqual({ success: true })
  })

  it('should fail on invalid card format', () => {
    expect(CardsUtils.validateDeck('11C')).toEqual({
      success: false,
      reason: 'Invalid card: 11C'
    })
    expect(CardsUtils.validateDeck('AX')).toEqual({
      success: false,
      reason: 'Invalid card: AX'
    })
  })

  it('should fail on duplicate cards', () => {
    expect(CardsUtils.validateDeck('AC AC')).toEqual({
      success: false,
      reason: 'Same card cannot repeat twice: AC'
    })
    expect(CardsUtils.validateDeck('A♣️ AC')).toEqual({
      success: false,
      reason: 'Same card cannot repeat twice: AC'
    })
  })

  it('should handle incomplete card input', () => {
    expect(CardsUtils.validateDeck('AC 2D A')).toEqual({ success: true })
  })
})

describe('CardsUtils.isValidCard', () => {
  it('should validate ASCII format cards', () => {
    // Valid cards
    expect(CardsUtils.isValidCard('AC')).toBe(true)
    expect(CardsUtils.isValidCard('TD')).toBe(true)
    expect(CardsUtils.isValidCard('KH')).toBe(true)
    expect(CardsUtils.isValidCard('2S')).toBe(true)

    // Invalid cards
    expect(CardsUtils.isValidCard('1C')).toBe(false)  // invalid rank
    expect(CardsUtils.isValidCard('AX')).toBe(false)  // invalid suit
    expect(CardsUtils.isValidCard('11C')).toBe(false) // too long
    expect(CardsUtils.isValidCard('A')).toBe(false)   // too short
  })

  it('should validate emoji format cards', () => {
    // Valid cards
    expect(CardsUtils.isValidCard('A♣️')).toBe(true)
    expect(CardsUtils.isValidCard('T♦️')).toBe(true)
    expect(CardsUtils.isValidCard('K♥️')).toBe(true)
    expect(CardsUtils.isValidCard('2♠️')).toBe(true)

    // Invalid cards
    expect(CardsUtils.isValidCard('1♣️')).toBe(false)  // invalid rank
    expect(CardsUtils.isValidCard('A♤')).toBe(false)   // invalid suit
  })
}) 

