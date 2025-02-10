<script lang="ts">
  import { onMount } from "svelte";
  import clubsSuit from '$lib/components/clubs_suit.png'
  import diamondsSuit from '$lib/components/diamonds_suit.png'
  import heartsSuit from '$lib/components/hearts_suit.png'
  import spadesSuit from '$lib/components/spades_suit.png'

  const props: {
    cards: string[]
  } = $props()
</script>

<style>
  .cards-grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(13, auto);
    grid-template-rows: repeat(4, auto);
    justify-content: space-between;
  }
</style>

<div class="cards-grid mt-8">
  {#each props.cards as card, cardIndex(card)}
    {@const suit = card[1]}
    {@const rank = card[0]}
    <div class="transition duration-500 motion-preset-shake {cardIndex % 2 == 0 ? 'motion-duration-500' : 'motion-duration-700'} h-12 w-9 rounded-sm dark:bg-slate-300  flex items-center justify-center
    hover:scale-125 hover:cursor-default">
      <span class="{['C', 'S'].includes(suit) ? 'dark:text-slate-700' : 'dark:text-red-700'}
                   font-bold">
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
