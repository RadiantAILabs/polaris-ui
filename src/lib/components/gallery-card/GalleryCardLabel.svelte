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

<style lang="scss">
	@use './GalleryCardLabel';
</style>
