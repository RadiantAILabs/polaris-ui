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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.gallery-card-grid {
  display: grid;
  gap: 1rem;
  align-items: start;
  width: 100%;
  min-width: 0;
}
.gallery-card-grid--columns-2 {
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
}
.gallery-card-grid--columns-3 {
  grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
}
.gallery-card-grid--columns-4 {
  grid-template-columns: repeat(auto-fit, minmax(min(120px, 100%), 1fr));
}</style>
