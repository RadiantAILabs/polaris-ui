<script lang="ts" module>
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { type WithElementRef } from '../../utils';

	export interface TableProps extends WithElementRef<HTMLTableAttributes> {
		hoverable?: boolean;
		primaryColumn?: boolean;
		/** Fill the available height and keep header cells visible while the table scrolls. */
		stickyHeader?: boolean;
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
		stickyHeader = false,
		...restProps
	}: TableProps = $props();

	setContext('table-hoverable', hoverable);
	setContext('table-primary-column', primaryColumn);
	setContext('table-sticky-header', stickyHeader);
</script>

<div class="table" class:table--sticky-header={stickyHeader}>
	<div class="table__viewport">
		<table bind:this={ref} class="table__element {className}" {...restProps}>
			{@render children?.()}
		</table>
	</div>
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.table {
		width: 100%;

		&__viewport {
			width: 100%;
			overflow-x: auto;
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
