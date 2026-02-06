<script lang="ts" module>
	import type { ButtonProps } from '../button/Button.svelte';
	import type { Snippet } from 'svelte';
	import type { UnderlineNavProps } from '../underline-nav';

	export interface MainWindowProps {
		title: string;
		button1?: Omit<ButtonProps, 'size'>;
		button2?: Omit<ButtonProps, 'size'>;
		button3?: Omit<ButtonProps, 'size'>;
		titleActions?: Snippet;
		headerContent?: Snippet;
		showNavbar?: boolean;
		navProps?: UnderlineNavProps;
		contentPadding?: boolean;
	}
</script>

<script lang="ts">
	import { PageTitleBar } from '../page-title-bar';
	import { UnderlineNav } from '../underline-nav';

	let {
		showNavbar = false,
		navProps,
		title,
		button1,
		button2,
		button3,
		titleActions,
		headerContent,
		contentPadding = true,
		children
	}: MainWindowProps & { children?: Snippet } = $props();
</script>

<div class="main-window">
	<div class="main-window__header">
		<div class="main-window__title-bar">
			<PageTitleBar {title} {button1} {button2} {button3}>
				{#snippet actions()}
					{#if titleActions}
						{@render titleActions()}
					{/if}
				{/snippet}
			</PageTitleBar>
		</div>
		{#if headerContent}
			{@render headerContent()}
		{/if}
		{#if showNavbar && navProps}
			<UnderlineNav showBorder={false} {...navProps} />
		{/if}
	</div>

	<div class="main-window__content" class:main-window__content--padded={contentPadding}>
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.main-window {
		display: flex;
		flex-direction: column;
		gap: $space-3;
		width: 100%;
		height: 100%;
		background-color: var(--color-background-base);

		&__header {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0 20px;
			box-shadow: inset 0 -1px 0 0 var(--color-border-base);
		}

		&__title-bar {
			padding: $space-2 0;
		}

		&__content {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: $space-3;
			width: 100%;

			&--padded {
				padding: 0 20px $space-2;
			}
		}
	}
</style>
