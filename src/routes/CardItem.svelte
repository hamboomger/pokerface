<script lang="ts">
    import { onMount } from "svelte";

  const {
    card, cardIndex, shouldHighlight, clickable, onCardClick, flipped
  }: {
    card: string,
    cardIndex: number,
    shouldHighlight: (cardIndex: number) => boolean,
    clickable?: boolean,
    onCardClick: (cardIndex: number) => void,
    flipped: boolean
  } = $props()

  const rank = card[0]
  const suit = card[1]
</script>

<style>
  @keyframes flip-and-hide {
    0% {
      transform: rotateY(0deg);
    }
    99% {
      transform: rotateY(90deg);
    }
    100% {
      display: none;
    }
  }
  @keyframes flip-and-show {
    0% {
      display: block;
      opacity: 0;
      transform: rotateY(90deg);
    }
    20% {
      opacity: 0;
      transform: rotateY(90deg);
    }
    21% {
      opacity: 100%;
    }
    99% {
      transform: rotateY(0deg);
    }
    100% {
      transform: unset;
    }
  }
  .card-wrapper {
    @apply shadow-lg rounded-md overflow-hidden
          hover:scale-150 hover:z-10 hover:cursor-default;
    position: relative;
    height: 85px;
    transition: transform 0.8s ease;
  }
  .card-wrapper:hover {
    transition: transform 0.2s ease;
  }

  /* CARD FRONT */
  .card-front {
    @apply flex items-center justify-center gap-1
      dark:border-none
      border-4 border-thirdly dark:border-thirdly-dark
      bg-secondary dark:bg-secondary-dark ;
    position: absolute;
    inset: 0;
  }
  .card-front.m-visible {
    animation: flip-and-show 400ms ease-in-out;
    transform: unset;
  }
  .card-front.m-hidden {
    display: none;
    transform: rotateY(90deg);
  }

  /* CARD BACK */
  .card-back {
    position: absolute;
    inset: 0;
  }
  .card-back.m-hidden {
    animation: flip-and-hide 200ms ease-in-out;
    transform: rotateY(90deg);
  }
  .card-back.m-visible {
    display: block;
  }
  .card-back.m-style-1 {
    --s: 14px; /* control the size*/
    --c1: #d7eed9;
    --c2: #f24040;
    
    --_g: var(--c1) 90deg,#0000 90.5deg;
    background:
    conic-gradient(from -45deg,var(--_g)),
    conic-gradient(from 135deg,var(--_g)) calc(var(--s)/2) 0,
    var(--c2);
    background-size: var(--s) var(--s);

    border: 4px solid #129f66;
}
</style>

<button class="card-wrapper
  {clickable ? 'hover:cursor-pointer' : ''}
  {shouldHighlight(cardIndex) ? '!border-accent !dark:border-accent' : ''}"
  onclick={() => clickable && onCardClick(cardIndex)}>
    <div class="card-front {flipped ? 'm-visible' : 'm-hidden'}">
        <div class="{['C', 'S'].includes(suit) ? 'dark:text-slate-700' : 'dark:text-red-700'}
                    font-bold text-lg">
          {rank}
        </div>
        <div class="text-sm">
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
    </div>
    <div class="card-back m-style-1 {flipped ? 'm-hidden' : 'm-visible'}"></div>
</button>
