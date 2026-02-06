<script lang="ts" module>
	import type { ButtonProps } from '../button';

	export type BlankStateProps = {
		title?: string;
		description: string;
		buttonProps?: Omit<ButtonProps, 'size'>;
		class?: string;
	};
</script>

<script lang="ts">
	import { Button } from '../button';
	import { cn } from '../../utils';

	let { title, description, buttonProps, class: className }: BlankStateProps = $props();
</script>

<div class={cn('blank-state', className)}>
	<div class="blank-state__text">
		{#if title}
			<h2 class="blank-state__title">{title}</h2>
		{/if}
		<p class="blank-state__description">{description}</p>
	</div>

	{#if buttonProps}
		<Button size="large" {...buttonProps} />
	{/if}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.blank-state {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  text-align: center;
  background-color: var(--color-background-base);
}
.blank-state__text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 15rem;
}
.blank-state__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: var(--color-text-primary);
}
.blank-state__description {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: var(--color-text-secondary);
  white-space: pre-line;
}</style>
