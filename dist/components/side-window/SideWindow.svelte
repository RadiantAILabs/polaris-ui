<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { SideWindowTitlePaneProps } from './SideWindowTitlePane.svelte';

	export interface SideWindowProps extends SideWindowTitlePaneProps {
		showTitlePane?: boolean;
		contentPadding?: boolean;
	}
</script>

<script lang="ts">
	import SideWindowTitlePane from './SideWindowTitlePane.svelte';

	let {
		showTitlePane = true,
		contentPadding = true,
		children,
		...titlePaneProps
	}: SideWindowProps & { children?: Snippet } = $props();
</script>

<div class="side-window">
	{#if showTitlePane}
		<SideWindowTitlePane {...titlePaneProps} />
	{/if}

	<div class="side-window__content" class:side-window__content--padded={contentPadding}>
		{@render children?.()}
	</div>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.side-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.side-window__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-height: 0;
  overflow: auto;
}
.side-window__content--padded {
  padding: 1rem 1.25rem;
}</style>
