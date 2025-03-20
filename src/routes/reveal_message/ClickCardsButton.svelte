<script lang="ts">
  import ClickIcon from './click_icon.svg';

  let {
    onclick
  }: {
    onclick: () => void
  } = $props()
</script>

<button id="click-on-cards-btn"
  class="py-2 px-6 text-2xl font-mono
        flex items-center
       bg-accent hover:opacity-90
       dark:border-gray-400 dark:bg-accent-dark mt-8 self-center
       hover:cursor-pointer dark:hover:bg-accent-dark transition-colors"
  onclick={onclick}>
  <img src={ClickIcon} class="w-6 h-6 mr-4" alt="Click icon" />
  Click on the cards instead
</button>
