<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AlertActionProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertActionProps = $props();
</script>

<div bind:this={ref} class={cn('alert__action', className)} {...restProps}>
	{@render children?.()}
</div>
