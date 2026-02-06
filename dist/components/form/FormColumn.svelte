<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils';

	type Props = {
		columns?: 2 | 3;
		children: Snippet;
		class?: string;
	};

	let { columns = 2, children, class: className }: Props = $props();
</script>

<div class={cn('form-column', `form-column--columns-${columns}`, className)}>
	{@render children?.()}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.form-column {
  display: grid;
  gap: 1rem 3rem;
  align-items: start;
  width: 100%;
}
.form-column--columns-2 {
  grid-template-columns: 1fr 1fr;
}
.form-column--columns-3 {
  grid-template-columns: 1fr 1fr 1fr;
}</style>
