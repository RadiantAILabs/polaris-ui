<script lang="ts">
	import { type WithElementRef } from '../../utils';
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { getContext } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();

	const primaryColumn = getContext<boolean>('table-primary-column') ?? false;
</script>

<td
	bind:this={ref}
	class="body-cell {primaryColumn ? 'body-cell--primary' : ''} {className}"
	{...restProps}
>
	{@render children?.()}
</td>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.body-cell {
		padding: $space-2 $space-3;
		vertical-align: middle;
		color: var(--color-text-secondary);
		white-space: nowrap;
		background-clip: padding-box;

		@include typography('body-base-regular');

		&.body-cell--primary:first-child {
			color: var(--color-text-primary);

			@include typography('body-base-semibold');
		}
	}
</style>
