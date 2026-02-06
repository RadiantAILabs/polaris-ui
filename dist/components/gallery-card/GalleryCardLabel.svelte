<script lang="ts">
	import type { Snippet } from 'svelte';

	export type GalleryCardLabelProps = {
		value?: string;
		label?: string;
		position?: 'below' | 'right';
		span?: number;
		children?: Snippet;
	};

	let { value, label, position = 'below', span, children }: GalleryCardLabelProps = $props();
</script>

<div
	class="gallery-card-label gallery-card-label--position-{position}"
	style:grid-column-end={span ? `span ${span}` : undefined}
>
	{#if label}
		<div class="gallery-card-label__label">
			{label}
		</div>
	{/if}
	{#if children}
		{@render children()}
	{:else if value !== undefined}
		<div class="gallery-card-label__value">
			{value}
		</div>
	{/if}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.gallery-card-label {
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.gallery-card-label--position-below {
  flex-direction: column;
  gap: 0rem;
  justify-content: center;
}
.gallery-card-label--position-right {
  flex-direction: row;
  gap: 0.5rem;
  align-items: start;
}
.gallery-card-label__label {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
  white-space: nowrap;
}
.gallery-card-label__value {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-secondary);
}</style>
