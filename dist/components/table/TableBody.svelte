<script lang="ts" module>
	import { type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface TableBodyProps extends WithElementRef<HTMLAttributes<HTMLTableSectionElement>> {
		emptyMessage?: string;
	}
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		emptyMessage = 'No data available',
		...restProps
	}: TableBodyProps = $props();

	const hasContent = $derived.by(() => {
		if (!children) return false;

		// Check if there are any actual table rows rendered by children
		const rows = ref?.querySelectorAll('tr:not(.table-body__empty-row)');
		return (rows?.length ?? 0) > 0;
	});
</script>

<tbody bind:this={ref} class="table-body {className}" {...restProps}>
	{@render children?.()}
	{#if !hasContent}
		<tr class="table-body__empty-row">
			<!-- Set colspan to 999 to span all columns, we do not expect more
			than 999 columns to ever be rendered -->
			<td class="table-body__empty-cell" colspan="999">
				<div class="table-body__empty-message">{emptyMessage}</div>
			</td>
		</tr>
	{/if}
</tbody>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.table-body {
  background-color: var(--color-background-base);
}
.table-body tr:last-child {
  border: 0;
}
.table-body__empty-row {
  border: 0;
}
.table-body__empty-cell {
  height: 100%;
  padding: 2rem;
  vertical-align: middle;
  text-align: center;
  border: 0;
}
.table-body__empty-message {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
}</style>
