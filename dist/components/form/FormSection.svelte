<script lang="ts">
	import type { ButtonProps } from '../button/Button.svelte';
	import FormSectionLegend from './FormSectionLegend.svelte';
	import { cn } from '../../utils';

	type Props = {
		title: string;
		actionButton?: Omit<ButtonProps, 'size'>;
		children?: import('svelte').Snippet;
		class?: string;
	};

	let { title, actionButton, children, class: className }: Props = $props();
</script>

<fieldset class={cn('form-section', className)}>
	<FormSectionLegend {title} {actionButton} />

	{#if children}
		<div class="form-section__content">
			{@render children()}
		</div>
	{/if}
</fieldset>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
}
.form-section__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}</style>
