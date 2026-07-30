<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AlertDescriptionProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertDescriptionProps = $props();
</script>

<div bind:this={ref} class={cn('alert__description', className)} {...restProps}>
	{@render children?.()}
</div>
