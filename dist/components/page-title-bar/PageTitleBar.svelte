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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.page-title-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 2rem;
}
.page-title-bar__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: var(--color-text-primary);
}
.page-title-bar__actions {
  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
  align-items: center;
}</style>
