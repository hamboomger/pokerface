<script lang="ts">

  const {
    cards,
    highlightedCardsIndexes = [],
    clickable = false
  }: {
    cards: string[],
    clickable?: boolean,
    highlightedCardsIndexes?: number[]
  } = $props()
  
  function shouldHighlight(cardIndex: number) {
    return highlightedCardsIndexes.includes(cardIndex)
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
    <div class="transition duration-100 motion-preset-shake {cardIndex % 2 == 0 ? 'motion-duration-500' : 'motion-duration-700'}
    h-20 w-14 rounded-md drop-shadow dark:border-none
    border-4 border-thirdly dark:border-thirdly-dark
  bg-secondary dark:bg-secondary-dark flex items-center justify-center
    hover:scale-150 hover:cursor-default hover:z-10 text-lg
    {clickable ? 'hover:cursor-pointer' : ''}
    {shouldHighlight(cardIndex) ? '' : ''}
    ">
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
    </div>
  {/each}
</div>
