<script lang="ts" module>
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { type WithElementRef } from '../../utils';

	export interface TableProps extends WithElementRef<HTMLTableAttributes> {
		hoverable?: boolean;
		primaryColumn?: boolean;
		/** Fill the available height and keep header cells visible while the table scrolls. */
		stickyHeader?: boolean;
		density?: 'base' | 'compact';
		columnDividers?: boolean;
	}
</script>

<script lang="ts">
	import { setTableContext } from './context';

	let {
		ref = $bindable(null),
		class: className,
		children,
		hoverable = false,
		primaryColumn = false,
		stickyHeader = false,
		density = 'base',
		columnDividers = false,
		...restProps
	}: TableProps = $props();

	setTableContext({
		get hoverable() {
			return hoverable;
		},
		get primaryColumn() {
			return primaryColumn;
		},
		get stickyHeader() {
			return stickyHeader;
		}
	});
</script>

<div
	class="table"
	class:table--sticky-header={stickyHeader}
	class:table--compact={density === 'compact'}
	class:table--dividers={columnDividers}
>
	<div class="table__viewport scroll-area">
		<table bind:this={ref} class="table__element {className}" {...restProps}>
			{@render children?.()}
		</table>
	</div>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.table {
		width: 100%;
		min-width: 0;
		max-width: 100%;

		&__viewport {
			width: 100%;
			overflow: auto hidden;
		}

		&--compact :global(td) {
			padding: 8px 12px;
		}

		&--compact :global(th) {
			padding: 4px;
		}

		&--dividers :global(th:not(:last-child)),
		&--dividers :global(td:not(:last-child)) {
			border-right: 1px solid color-mix(in srgb, var(--color-border-base) 45%, transparent);
		}

		// -- Table element --
		&__element {
			width: 100%;
			table-layout: auto;
			border-spacing: 0;
			border-collapse: separate;
			background-color: var(--color-background-base);
			border: $border-width-base solid var(--color-border-base);
			border-radius: $border-radius-base;
		}

		&--sticky-header {
			flex: 0 1 auto;
			min-height: 0;
			max-height: 100%;
			overflow: hidden;
			background-color: var(--color-background-base);
			border: $border-width-base solid var(--color-border-base);
			border-radius: $border-radius-base;

			.table__viewport {
				height: 100%;
				overflow: auto;
			}

			.table__element {
				border: 0;
				border-radius: 0;
			}
		}
	}
</style>
