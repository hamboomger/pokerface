<script lang="ts">
  import ClipboardIcon from './clipboard_icon.svg';

  let {
    onclick
  }: {
    onclick: () => void
  } = $props()
</script>

<button id="paste-button" 
  class="px-6 py-2 self-center text-2xl
        flex items-center transition-all
        bg-secondary hover:bg-accent hover:scale-105
        hover:cursor-pointer font-mono 
        dark:bg-secondary-dark dark:hover:bg-accent-dark"
        onclick={onclick}>
  <img src={ClipboardIcon} class="w-6 h-6 mr-4" alt="Clipboard icon" />
  Paste from clipboard
</button>
