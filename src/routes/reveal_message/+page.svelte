<script lang="ts">
    import jokerHat2Img from '$lib/components/joker_hat_2.png?enhanced'
    import PokerCardsDeck from '../PokerCardsDeck.svelte';
    import MessageToDecodeTextArea from './MessageToDecodeTextArea.svelte';

    const deck = [
      'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
      'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
      'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
      'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS'
    ]

    let text = $state('')
    let showDecryptButton = $state(false)
</script>

<div class="mx-auto w-full pt-12 flex flex-col pb-12">
  <div class="self-center sm:w-60 motion-preset-seesaw motion-preset-stretch-sm motion-duration-2000">
    <enhanced:img src={jokerHat2Img} alt="Joker hat" />
  </div>
  <h2 class="text-3xl mt-4 dark:text-white font-mono self-center">Reveal message hidden in a deck of cards</h2>
  <MessageToDecodeTextArea bind:text={text} />
  <PokerCardsDeck cards={deck} />
  {#if showDecryptButton}
    <button id="copy-the-deck-btn" class="
    py-3 px-5 text-2xl font-mono text-white
    bg-accent hover:opacity-90
  dark:border-gray-400 dark:bg-slate-600 dark:text-gray-100 mt-8 self-center
    hover:cursor-pointer hover:dark:bg-slate-500 transition-colors"
    >
      Reveal
  </button>
  {/if}
</div>
