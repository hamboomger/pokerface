<script lang="ts">
  let {
    text = $bindable(),
    isValidationError = $bindable()
  }: {
    text: string,
    isValidationError: boolean
  } = $props()

  let maxCharacters = 42

  let notAllowedSymbolsUsed = $derived.by(() => {
    return ! /^[,.\/ a-zA-Z0-9:]*$/.test(text)
  })
  let isError = $derived(text.length >= maxCharacters || notAllowedSymbolsUsed)
  $effect(() => {
    isValidationError = isError
  })
  
  let charactersLeft = $derived.by(() => {
    return Math.max(0, maxCharacters - text.length)
  })
</script>

<div class="w-full mt-8">
  <div class="flex justify-between items-center mb-2">
    <span class="block text-md text-gray-700 dark:text-slate-300">
      {charactersLeft} characters left. 
    </span>
    <span class="dark:text-slate-300">
      Allowed characters: <code>a-z0-9,.:/[space]</code>
    </span>
  </div>
  <div class="relative">
    <input id="hs-validation-name-error" 
        autocomplete="off"
              bind:value={text}
              class="border py-3 px-4 block w-full text-2xl h-16 drop-shadow-xl
                    {isError
                      ? 'border-red-500 focus:border focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}
                    rounded-full text-2xl font-mono disabled:opacity-50 disabled:pointer-events-none
                    text-center
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        placeholder="...or paste a link!" aria-describedby="hs-validation-name-error-helper"
    />
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
  {#if isError}
    <p class="motion-preset-fade motion-duration-500 text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">
      {#if text.length >= maxCharacters}
        Your message is over {maxCharacters} long.
      {:else if notAllowedSymbolsUsed}
        Can't use forbidden symbols.
      {/if}
    </p>
  {/if}
</div>
