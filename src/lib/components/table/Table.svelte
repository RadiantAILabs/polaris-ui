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

<style lang="scss">
	@use '../../styles/tokens' as *;

	.table {
		position: relative;
		width: 100%;
		overflow-x: auto;

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
	}
</style>
