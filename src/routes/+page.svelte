<script lang="ts">
    import MessageToIncodeTextField from "./MessageToIncodeTextField.svelte";
    import _ from 'lodash'
    import { ServerAPI } from "$lib/client/ServerAPI";
    import PokerCardsDeck from "$lib/components/poker_cards/PokerCardsDeck.svelte";
    import { ClientUtils } from "$lib/client/ClientUtils";
    import jokerHatImg from '$lib/components/joker_hat.png?enhanced'
    import MainButton from "$lib/components/MainButton.svelte";

    const originalOrder = [
      'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
      'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS'
    ]

    const DELAY_BEFORE_SCROLLING_TO_COPY_BTN = 1_000

    let text = $state('')
    let isValidationError = $state(false)
    let lastTypedCharacterTime = $derived.by(() => {
      if (text.length) {
        return Date.now()
      }
      return undefined
    })
    let scrollTriggeredAtLeastOnce = $state(false)

    let deck = $state(originalOrder)

    let showCopyDeckBtn = $state(false)
    let showDeckCopiedMessage = $state(false)

    async function copyDeckToClipboard() {
      const unicodedDeck = ClientUtils.replaceCardsWithEmojis(deck)
      await navigator.clipboard.writeText(unicodedDeck.join('  '))

      showDeckCopiedMessage = true
      setTimeout(() => {
        showDeckCopiedMessage = false
      }, 2_000)
    }

    $effect(() => {
      if (!lastTypedCharacterTime) {
        scrollTriggeredAtLeastOnce = false
        return
      }

      if (scrollTriggeredAtLeastOnce) {
        return
      }

      const timestampBeforeTimeout = lastTypedCharacterTime
      setTimeout(() => {
        if (timestampBeforeTimeout === lastTypedCharacterTime && !isValidationError) {
          scrollTriggeredAtLeastOnce = true
          showCopyDeckBtn = true
          setTimeout(
            () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
            200
          )
        }
      }, DELAY_BEFORE_SCROLLING_TO_COPY_BTN)
    })

    const encodeMessageAndUpdateDeck = _.throttle((message: string) => {
      ServerAPI.encode(message)
        .then((encodedDeck) => {
        deck = encodedDeck
      })
    }, 600)

    $effect(() => {
      if (!text.length) {
        deck = originalOrder
        return
      }

      encodeMessageAndUpdateDeck(text)
    })
</script>

<style>
  #copy-the-deck-btn.m-visible {
    animation: fade-in-delayed 0.4s;
  }
  @keyframes fade-in-delayed {
    0%   {opacity: 0; }
    80%  {opacity: 0; }
    100% {opacity: 100; }
  }
</style>

<div class="mx-auto w-full pt-12 flex flex-col pb-12">
  <div class="self-center w-32 sm:w-48 motion-preset-seesaw">
    <enhanced:img src={jokerHatImg} alt="Joker hat" />
  </div>

  <h2 class="text-xl sm:text-3xl dark:text-slate-200 font-mono self-center">Hide message in a deck of cards</h2>
  <MessageToIncodeTextField bind:isValidationError={isValidationError} bind:text={text} />
  {#if deck.length > 0}
    <PokerCardsDeck bind:cards={deck} />
  {/if}

  <div class="overflow-hidden mx-auto pt-6
    {showCopyDeckBtn ? 'm-visible min-h-6 h-fit' : 'h-0 !p-0'}">
    <MainButton onClick={() => copyDeckToClipboard()}>
      {#if showDeckCopiedMessage}
        deck copied!
      {:else}
        copy the deck
      {/if}
    </MainButton>
  </div>
</div>
