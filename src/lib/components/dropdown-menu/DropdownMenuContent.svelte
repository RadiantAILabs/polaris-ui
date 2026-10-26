<script lang="ts">
	import { DropdownMenu as Menu, type WithoutChild } from 'bits-ui';
	import { cn } from '../../utils';
	let {
		ref = $bindable(null),
		class: className,
		children,
		portalProps,
		sideOffset = 4,
		collisionPadding = 8,
		...props
	}: WithoutChild<Menu.ContentProps> & { portalProps?: Menu.PortalProps } = $props();
</script>

<Menu.Portal {...portalProps}>
	<Menu.Content bind:ref align="start" {sideOffset} {collisionPadding} {...props}>
		{#snippet child({ props: contentProps, wrapperProps })}
			<div {...wrapperProps}>
				<div {...contentProps} class={cn('polaris-menu-content scroll-area', className)}>
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</Menu.Content>
</Menu.Portal>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-menu-content {
		@include floating.surface(24rem);
	}
</style>
