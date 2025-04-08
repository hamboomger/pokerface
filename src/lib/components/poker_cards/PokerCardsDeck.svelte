<script lang="ts">
  import { onMount } from "svelte";
  import CardItem from "./CardItem.svelte";

  let {
    cards = $bindable(),
    clickable = false,
    currentOrderIsNotStandard = $bindable(),
    onClick = () => undefined
  }: {
    cards: string[],
    clickable?: boolean,
    currentOrderIsNotStandard?: boolean,
    onClick?: (card: string) => void
  } = $props()
  
  let customOrderedCards = $state<Array<{card: string, originalPosition: number, currentPosition: number}>>([])
  let cardsFlipPosition = $state(cards.map((card) => ({ card, flipped: false })))

  function shouldHighlight(cardIndex: number): boolean {
    return partOfCustomOrder(cardIndex)
  }

  function partOfCustomOrder(cardIndex: number): boolean {
    return Boolean(
      customOrderedCards.find((card) => card.currentPosition === cardIndex)
    )
  }

  function cardFlipped(cardIndex: number): boolean {
    return cardsFlipPosition[cardIndex].flipped
  }

  function getFirstEmptyPosition() {
    for (let i = 0; i < cards.length; i++) {
      const matchingElement = customOrderedCards.find((card) => card.currentPosition === i)
      if (!matchingElement) {
        return i
      }
    }

    return undefined
  }

  function onCardClick(cardIndex: number) {
    onClick(cards[cardIndex])

    currentOrderIsNotStandard = true
    if (!partOfCustomOrder(cardIndex)) {
      const firstEmptyPosition = getFirstEmptyPosition()!

      customOrderedCards.push({
        card: cards[cardIndex],
        originalPosition: cardIndex,
        currentPosition: firstEmptyPosition
      })

      swapCards(cardIndex, firstEmptyPosition)
    } else {
      const customOrderedCard = customOrderedCards[cardIndex]
      swapCards(cardIndex, customOrderedCard.originalPosition)
      customOrderedCards = customOrderedCards.filter((card) => card.currentPosition !== cardIndex)
    }
  }

  function swapCards(cardAIndex: number, cardBIndex: number) {
    let cardsCopy = [...cards]
    const cardA = cardsCopy[cardAIndex]
    const cardB = cardsCopy[cardBIndex]
    console.log(`cardA: ${cardA}`)
    console.log(`cardB: ${cardB}`)
    console.log(`cardBIndex: ${cardBIndex}`)
    cardsCopy[cardAIndex] = cardB
    cardsCopy[cardBIndex] = cardA
    cards = [...cardsCopy]
  }

  onMount(() => {
    for (let i = 0; i < 52; i++) {
      setTimeout(() => {
        cardsFlipPosition[i].flipped = true
      }, i*20)
    }
  })
</script>

<style>
  .cards-grid {
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(13, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-content: center;
  }
</style>

<div class="cards-grid mt-8">
  {#each cards as card, cardIndex(card)}
    {#key cardsFlipPosition[cardIndex].flipped}
      {#key shouldHighlight(cardIndex)}
        <CardItem card={card} cardIndex={cardIndex}
            shouldHighlight={shouldHighlight} 
            clickable={clickable}
            onCardClick={onCardClick}
            flipped={cardFlipped(cardIndex)} />
      {/key}
    {/key}
  {/each}
</div>
