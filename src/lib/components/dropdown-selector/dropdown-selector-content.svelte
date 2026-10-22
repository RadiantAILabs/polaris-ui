<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		align = 'start',
		collisionPadding = 8,
		avoidCollisions = true,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps;
	} = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{align}
		{avoidCollisions}
		{collisionPadding}
		{...restProps}
	>
		{#snippet child({ wrapperProps, props })}
			<div {...wrapperProps}>
				<div {...props} class={cn('content scroll-area', className)}>
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

<style lang="scss">
	@use '../../styles/floating';

	.content {
		@include floating.surface(24rem);

		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: max-content;
		min-width: var(--bits-select-anchor-width);
		overflow: hidden auto;
		transform-origin: var(--bits-select-content-transform-origin);
	}
</style>
