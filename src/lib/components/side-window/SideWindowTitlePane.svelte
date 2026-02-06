<script lang="ts" module>
	import type { SideWindowTitleProps } from './SideWindowTitle.svelte';
	import type { UnderlineNavProps } from '../underline-nav';
	export interface SideWindowTitlePaneProps extends SideWindowTitleProps {
		showNavbar?: boolean;
		navProps?: UnderlineNavProps;
	}
</script>

<script lang="ts">
	import SideWindowTitle from './SideWindowTitle.svelte';
	import { UnderlineNav } from '../underline-nav';

	let {
		showNavbar = false,
		navProps,
		title = 'Default Title',
		iconAndText1,
		iconAndText2,
		showExpand,
		showClose,
		onExpand,
		onClose,
		titleActions
	}: SideWindowTitlePaneProps = $props();

	const titleProps = $derived({
		title,
		iconAndText1,
		iconAndText2,
		showExpand,
		showClose,
		onExpand,
		onClose,
		titleActions
	});
</script>

<div class="side-window-title-pane">
	<div class="side-window-title-pane__content">
		<SideWindowTitle {...titleProps} />
	</div>

	{#if showNavbar}
		<div class="side-window-title-pane__navbar">
			{#if navProps}
				<UnderlineNav showBorder={false} {...navProps} />
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.side-window-title-pane {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		width: 100%;
		box-shadow: inset 0 -1px 0 0 var(--color-border-base);
	}

	.side-window-title-pane__content {
		width: 100%;
		min-width: 0;
		padding: $space-2 $space-2-5;
	}

	.side-window-title-pane__navbar {
		display: flex;
		width: 100%;
		min-width: 0;
		padding: 0 $space-1-5;
		overflow: hidden;
	}
</style>
