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

<style lang="scss">
	@use '../../styles/tokens' as *;

	.table-body {
		background-color: var(--color-background-base);

		tr:last-child {
			border: 0;
		}

		&__empty-row {
			border: 0;
		}

		&__empty-cell {
			height: 100%;
			padding: $space-4;
			vertical-align: middle;
			text-align: center;
			border: 0;
		}

		&__empty-message {
			@include typography('body-base-regular');

			color: var(--color-text-primary);
		}
	}
</style>
