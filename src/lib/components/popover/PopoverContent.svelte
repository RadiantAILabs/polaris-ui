<script lang="ts">
	import { Popover as Primitive, type WithoutChild } from 'bits-ui';
	import { cn } from '../../utils';
	let {
		ref = $bindable(null),
		class: className,
		children,
		portalProps,
		sideOffset = 4,
		align = 'start',
		collisionPadding = 8,
		...props
	}: WithoutChild<Primitive.ContentProps> & { portalProps?: Primitive.PortalProps } = $props();
</script>

<Primitive.Portal {...portalProps}>
	<Primitive.Content bind:ref {sideOffset} {align} {collisionPadding} {...props}>
		{#snippet child({ props: contentProps, wrapperProps })}
			<div {...wrapperProps}>
				<div {...contentProps} class={cn('polaris-popover-surface scroll-area', className)}>
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</Primitive.Content>
</Primitive.Portal>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-popover-surface {
		@include floating.surface;

		padding: 0;
	}
</style>
