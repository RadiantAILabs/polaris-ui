<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export type AlertVariant = 'default' | 'success' | 'warning' | 'error';

	export type AlertProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	};
</script>

<script lang="ts">
	import './Alert.scss';

	let {
		variant = 'default',
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: AlertProps = $props();
</script>

<div
	bind:this={ref}
	role="alert"
	class={cn('alert', `alert--${variant}`, className)}
	{...restProps}
>
	{@render children?.()}
</div>
