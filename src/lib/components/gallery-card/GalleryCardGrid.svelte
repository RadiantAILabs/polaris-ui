<script lang="ts">
	import type { Snippet } from 'svelte';

	export type GalleryCardGridProps = {
		columns?: 2 | 3 | 4;
		children: Snippet;
	};

	let { columns = 2, children }: GalleryCardGridProps = $props();
</script>

<div class="gallery-card-grid gallery-card-grid--columns-{columns}">
	{@render children?.()}
</div>

<style lang="scss">
	@use './GalleryCardGrid';
</style>
