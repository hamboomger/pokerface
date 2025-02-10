<script lang="ts">
    import MessageToIncodeTextArea from "./MessageToIncodeTextArea.svelte";
    import _ from 'lodash'
    import { ServerAPI } from "$lib/client/ServerAPI";
    import PokerCardsDeck from "./PokerCardsDeck.svelte";
    import { ClientUtils } from "$lib/client/ClientUtils";

    const originalOrder = [
      'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
      'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS'
    ]

    let text = $state('')
    let deck = $state(originalOrder)
    let showDeckCopiedMessage = $state(false)

    const encodeMessage = _.throttle((message: string) => {
      ServerAPI.encode(message)
        .then((encodedDeck) => {
        deck = encodedDeck
        console.log('Debounce called')
      })
    }, 600)

    async function copyDeckToClipboard() {
      const unicodedDeck = ClientUtils.replaceCardsWithEmojis(deck)
      await navigator.clipboard.writeText(unicodedDeck.join(','))

      showDeckCopiedMessage = true
      setTimeout(() => {
        showDeckCopiedMessage = false
      }, 2_000)
    }

    $effect(() => {
      if (!text.length) {
        deck = originalOrder
        return
      }

      encodeMessage(text)
    })
</script>

<style>
  #copy-the-deck-btn {
    animation: fade-in-delayed 1s;
  }
  @keyframes fade-in-delayed {
    0%   {opacity: 0; }
    80%  {opacity: 0; }
    100% {opacity: 100; }
  }
</style>

<div class="mx-auto w-full sm:w-[52rem] pt-12 flex flex-col">
  <h2 class="text-3xl dark:text-white font-mono">Hide message in a deck of cards</h2>
  <div class="w-fit mt-4 bg-white border border-gray-200 rounded-xl drop-shadow-sm dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabindex="-1" aria-labelledby="hs-toast-normal-example-label">
    <div class="flex p-4">
      <div class="shrink-0">
        <svg class="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
        </svg>
      </div>
      <div class="ms-3 shrink">
        <p id="hs-toast-normal-example-label" class="text-sm font-mono text-gray-700 dark:text-neutral-400">
          Encode a message in a deck of cards. Allowed characters: <code>a-z0-9,.:/[space]</code>
        </p>
      </div>
    </div>
  </div>
  <MessageToIncodeTextArea bind:text={text} />
  {#if deck.length > 0}
    <PokerCardsDeck cards={deck} />
  {/if}
  {#if text.length > 0}
    <button id="copy-the-deck-btn" class="
    py-3 px-5 text-2xl font-mono border
  dark:border-gray-400 dark:bg-slate-600 dark:text-gray-100 mt-8 self-center
    hover:cursor-pointer hover:dark:bg-slate-500 transition-colors"
    onclick={() => copyDeckToClipboard()}
    >
    {#if showDeckCopiedMessage}
      deck copied!
    {:else}
      copy the deck
    {/if}
  </button>
  {/if}
</div>