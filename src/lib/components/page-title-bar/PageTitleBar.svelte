<script lang="ts" module>
	import type { ButtonProps } from '../button/Button.svelte';

	export interface PageTitleBarProps {
		title: string;
		button1?: Omit<ButtonProps, 'size'>;
		button2?: Omit<ButtonProps, 'size'>;
		button3?: Omit<ButtonProps, 'size'>;
	}
</script>

<script lang="ts">
	import { Button } from '../button';

	let {
		title,
		button1,
		button2,
		button3,
		actions
	}: PageTitleBarProps & { actions?: import('svelte').Snippet } = $props();

	// Filter out undefined buttons and ensure we only render defined buttons
	const buttons = $derived([button1, button2, button3].filter(Boolean));
</script>

<header class="page-title-bar">
	<h1 class="page-title-bar__title">{title}</h1>

	{#if buttons.length > 0 || actions}
		<div class="page-title-bar__actions">
			{#if actions}
				{@render actions()}
			{/if}
			{#each buttons as buttonProps, i (i)}
				<Button {...buttonProps} size="base" />
			{/each}
		</div>
	{/if}
</header>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.page-title-bar {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		min-height: $space-4;

		&__title {
			@include typography('heading-large');

			margin: 0;
			color: var(--color-text-primary);
		}

		&__actions {
			display: flex;
			flex-shrink: 0;
			gap: $space-1;
			align-items: center;
		}
	}
</style>
