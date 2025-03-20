<script lang="ts">
    import { CardsUtils } from "$lib/shared/CardsUtils";
    import { error } from "@sveltejs/kit";
    import ClipboardIcon from './clipboard_icon.svg';

  let {
    text = $bindable(),
    pasteButton = false
  }: {
    text: string
    pasteButton?: boolean
  } = $props()

  let totalCards = 52
  let isPasteBtnHovered = $state(false)

  let errorMessage = $derived.by(() => {
    const result = CardsUtils.validateDeck(text)
    if (!result.success) {
      return result.reason
    }
    if (CardsUtils.countCardsInAText(text) >= totalCards) {
      return `Your message contains more then ${totalCards} cards.`
    }
    
    return undefined
  })
  let isError = $derived(text.length >= totalCards || errorMessage)
  
  let cardsLeft = $derived.by(() => {
    return Math.max(0, totalCards - text.length)
  })

  function onPasteBtnEnter() {
    console.log('onPasteBtnEnter')
    isPasteBtnHovered = true
  }

  function onPasteBtnLeave() {
    console.log('onPasteBtnLeave')
    isPasteBtnHovered = false
  }
</script>

<div class="w-full mt-8">
  <div class="flex justify-between items-center mb-2">
    <span class="block text-md text-gray-900 dark:text-white">
      {cardsLeft} cards left. 
    </span>
  </div>
  <div class="relative flex">
    <textarea id="hs-validation-name-error" 
              bind:value={text}
              class="border py-3 px-4 block w-full text-2xl h-16 drop-shadow-xl
                    {isError
                      ? 'border-red-500 focus:border focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}
                    rounded-full text-2xl font-mono disabled:opacity-50 disabled:pointer-events-none
                    text-center
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        rows=4 placeholder="[paste here]" aria-describedby="hs-validation-name-error-helper"
    >
    </textarea>
    {#if pasteButton}
      <button id="paste-button" 
              class="px-6 py-2 
                     flex items-center pointer-events-none p-3
                     z-10
                     hover:cursor-pointer font-mono bg-accent-dark text-2xl"
                     onmouseenter={() => onPasteBtnEnter()}
                     onmouseleave={() => onPasteBtnLeave()}>
        <img src={ClipboardIcon} class="w-6 h-6" alt="Clipboard icon" />
        <p class="w-0 overflow-hidden">clipboard</p>
      </button>
    {/if}
    <div class="absolute top-0 end-0 flex items-center pointer-events-none p-3">
      {#if isError}
        <svg class="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
      {/if}
    </div>
  </div>
  {#if errorMessage}
    <p class="motion-preset-fade motion-duration-500 text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
      {errorMessage}
    </p>
  {/if}
</div>
