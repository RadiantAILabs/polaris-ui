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

<style lang="scss">
	@use '../../styles/tokens' as *;

	.side-window {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		&__content {
			display: flex;
			flex: 1;
			flex-direction: column;
			width: 100%;
			min-height: 0;
			overflow: auto;

			&--padded {
				gap: $space-3;
				padding: $space-2 $space-2-5;
			}
		}
	}
</style>
