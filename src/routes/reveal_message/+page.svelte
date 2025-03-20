<script lang="ts">
    import { ServerAPI } from '$lib/client/ServerAPI';
    import jokerHat2Img from '$lib/components/joker_hat_2.png?enhanced'
    import { CardsUtils } from '$lib/shared/CardsUtils';
    import PokerCardsDeck from '../PokerCardsDeck.svelte';
    import PasteFromClipboardButton from './PasteFromClipboardButton.svelte';
    const originalDeck = CardsUtils.standardDeck
    let deck = $state([...originalDeck])

    let encryptedDeck = $state('')
    let errorMessage = $state<string | undefined>(undefined)
    let decryptedMessage = $state<string | undefined>(undefined)

    let currentOrderIsNotStandard = $state(false)
    let showDecryptButton = $derived(currentOrderIsNotStandard)

    async function onPasteFromClipboard() {
      console.log('onPasteFromClipboard !')
      navigator.clipboard.readText().then((clipboardText) => {
        console.log(`clipboardText: ${clipboardText}`)
        deck = clipboardText.split(' ')
        decryptMessage()
      })
    }

    async function decryptMessage() {
      encryptedDeck = deck.join(' ')
      console.log('onDecryptMessage')
      const validationResult = CardsUtils.validateDeck(encryptedDeck)
      if (!validationResult.success) {
        errorMessage = validationResult.reason
        return
      }

      decryptedMessage = await ServerAPI.decode(encryptedDeck.split(' '))
    }
</script>

<div class="mx-auto w-full pt-12 flex flex-col pb-12">
  <div class="self-center sm:w-60 motion-preset-seesaw motion-preset-stretch-sm motion-duration-2000">
    <enhanced:img src={jokerHat2Img} alt="Joker hat" />
  </div>
  <h2 class="text-3xl mt-4 mb-8 dark:text-white font-mono self-center">Reveal message hidden in a deck of cards</h2>
  <PasteFromClipboardButton onclick={onPasteFromClipboard} />
  <h5 class="text-lg mt-8 dark:text-white font-mono self-center">... or click on the cards in the right order below:</h5>
  <PokerCardsDeck clickable={true} cards={deck} bind:currentOrderIsNotStandard={currentOrderIsNotStandard} />
  {#if showDecryptButton}
    <button id="decrypt-msg-btn" class="
    py-3 px-5 text-2xl font-mono text-white
  bg-accent hover:opacity-90
  dark:border-gray-400 dark:bg-slate-600 dark:text-gray-100 mt-8 self-center
    hover:cursor-pointer hover:dark:bg-slate-500 transition-colors"
    onclick={decryptMessage}
    >
      Reveal
  </button>
  {/if}
  {#if decryptedMessage}
    <p>{decryptMessage}</p>
  {/if}
</div>
