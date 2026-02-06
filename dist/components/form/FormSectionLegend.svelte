<script lang="ts">
	import type { ButtonProps } from '../button/Button.svelte';
	import { Button } from '../button';
	import { cn } from '../../utils';

	type Props = {
		title: string;
		actionButton?: Omit<ButtonProps, 'size'>;
		class?: string;
	};

	let { title, actionButton, class: className }: Props = $props();
</script>

<legend class={cn('form-section-legend', className)}>
	<span class="form-section-legend__heading">{title}</span>

	{#if actionButton}
		<div class="form-section-legend__actions">
			<Button {...actionButton} size="base" />
		</div>
	{/if}
</legend>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.form-section-legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: 0 0 0.5rem;
}
.form-section-legend__heading {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex: 1;
  align-items: center;
  height: 2rem;
  margin: 0;
  color: var(--color-text-primary);
}
.form-section-legend__actions {
  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
  align-items: flex-start;
  align-self: flex-start;
}</style>
