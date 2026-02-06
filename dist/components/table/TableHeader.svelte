<script lang="ts">
	import { type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props();
</script>

<thead bind:this={ref} class="header {className}" {...restProps}>
	<tr class="header-row">
		{@render children?.()}
	</tr>
</thead>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.header {
  background-color: var(--color-table-header-cell-background);
}</style>
