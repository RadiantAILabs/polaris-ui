<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../../utils';
	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div role="presentation" bind:this={ref} class={cn('polaris-menu-label', className)} {...props}>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-menu-label {
		@include floating.label;
	}
</style>
