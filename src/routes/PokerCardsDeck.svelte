<script lang="ts">
  let {
    cards = $bindable(),
    clickable = false,
    currentOrderIsNotStandard = $bindable()
  }: {
    cards: string[],
    clickable?: boolean,
    currentOrderIsNotStandard?: boolean
  } = $props()
  
  let customOrderedCards = $state<Array<{card: string, originalPosition: number, currentPosition: number}>>([])

  function shouldHighlight(cardIndex: number) {
    return partOfCustomOrder(cardIndex)
  }

  function partOfCustomOrder(cardIndex: number) {
    return customOrderedCards.find((card) => card.currentPosition === cardIndex)
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
</script>

<style>
  .cards-grid {
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(13, auto);
    grid-template-rows: repeat(4, auto);
    justify-content: center;
  }
</style>

<div class="cards-grid mt-8">
  {#each cards as card, cardIndex(card)}
    {@const suit = card[1]}
    {@const rank = card[0]}
    <button class="transition duration-100 motion-preset-shake {cardIndex % 2 == 0 ? 'motion-duration-500' : 'motion-duration-700'}
    h-20 w-14 rounded-md drop-shadow dark:border-none
    border-4 border-thirdly dark:border-thirdly-dark
  bg-secondary dark:bg-secondary-dark flex items-center justify-center
    hover:scale-150 hover:cursor-default hover:z-10 text-lg
    {clickable ? 'hover:cursor-pointer' : ''}
    {shouldHighlight(cardIndex) ? 'border-accent' : ''}"
    onclick={() => clickable && onCardClick(cardIndex)}>
      <span class="{['C', 'S'].includes(suit) ? 'dark:text-slate-700' : 'dark:text-red-700'}
                   font-bold text-lg mr-1">
        {rank}
      </span>
      {#if suit == 'D'}
        ♦️
      {:else if suit === 'C'}
        ♣️
      {:else if suit === 'H'}
        ♥️
      {:else if suit === 'S'}
        ♠️
      {/if}
    </button>
  {/each}
</div>
