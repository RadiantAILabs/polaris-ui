<script lang="ts" module>
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { type WithElementRef } from '../../utils';

	export interface TableProps extends WithElementRef<HTMLTableAttributes> {
		hoverable?: boolean;
		primaryColumn?: boolean;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		hoverable = false,
		primaryColumn = false,
		...restProps
	}: TableProps = $props();

	setContext('table-hoverable', hoverable);
	setContext('table-primary-column', primaryColumn);
</script>

<div class="table">
	<table bind:this={ref} class="table__element {className}" {...restProps}>
		{@render children?.()}
	</table>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.table {
  position: relative;
  width: 100%;
  overflow-x: auto;
}
.table__element {
  width: 100%;
  table-layout: auto;
  border-spacing: 0;
  border-collapse: separate;
  background-color: var(--color-background-base);
  border: 1px solid var(--color-border-base);
  border-radius: 2px;
}</style>
