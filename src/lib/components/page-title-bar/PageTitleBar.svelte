<script lang="ts" module>
	import type { ButtonProps } from '../button/Button.svelte';
	import type { BreadcrumbItem } from '../breadcrumbs';

	export interface PageTitleBarProps {
		title: string;
		breadcrumbs?: BreadcrumbItem[];
		button1?: Omit<ButtonProps, 'size'>;
		button2?: Omit<ButtonProps, 'size'>;
		button3?: Omit<ButtonProps, 'size'>;
	}
</script>

<script lang="ts">
	import { Button } from '../button';
	import { Breadcrumbs } from '../breadcrumbs';

	let {
		title,
		breadcrumbs,
		button1,
		button2,
		button3,
		actions
	}: PageTitleBarProps & { actions?: import('svelte').Snippet } = $props();

	// Filter out undefined buttons and ensure we only render defined buttons
	const buttons = $derived([button1, button2, button3].filter(Boolean));
</script>

<header class="page-title-bar">
	<div class="page-title-bar__heading">
		{#if breadcrumbs && breadcrumbs.length > 0}
			<Breadcrumbs items={breadcrumbs} />
		{/if}
		<div class="page-title-bar__row">
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
		</div>
	</div>
</header>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.page-title-bar {
		display: flex;
		width: 100%;

		&__heading {
			display: flex;
			flex-direction: column;
			gap: $space-1;
			width: 100%;
		}

		&__row {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			width: 100%;
			min-height: $space-4;
		}

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
