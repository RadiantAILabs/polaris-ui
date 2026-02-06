<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		collisionPadding = 8,
		avoidCollisions = true,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps;
	} = $props();

	function handleContentHeight(el: HTMLElement) {
		function updateHeight() {
			requestAnimationFrame(() => {
				const availableHeight = parseInt(
					window
						.getComputedStyle(el)
						.getPropertyValue('--bits-select-content-available-height')
						.replace('px', '')
				);

				if (!isNaN(availableHeight)) {
					// Set max height and apply scroll area styling
					el.style.maxHeight = `${availableHeight}px`;
				}
			});
		}

		// Initial height calculation
		updateHeight();

		// Add resize listener to recalculate on window resize
		const handleResize = () => updateHeight();
		window.addEventListener('resize', handleResize);

		// Cleanup function
		return {
			destroy() {
				window.removeEventListener('resize', handleResize);
			}
		};
	}
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{avoidCollisions}
		{collisionPadding}
		{...restProps}
	>
		{#snippet child({ wrapperProps, props })}
			<div {...wrapperProps}>
				<div {...props} class={cn('content scroll-area', className)} use:handleContentHeight>
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

<style lang="scss">
	@use '../../styles/tokens' as *;

	// Content (dropdown) styles
	.content {
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: $space-1;
		align-items: flex-start;
		width: max-content;
		min-width: var(--bits-select-anchor-width);
		max-height: 24rem;
		padding: $space-0-5;
		overflow: hidden auto;
		background-color: var(--color-control-background-active);
		border: $border-width-base solid var(--color-control-border-active);
		border-radius: $border-radius-base;

		// TODO make box-shadow variable
		box-shadow: 0 10px 30px 0 rgb(38 128 134 / 6%);
		transform-origin: var(--bits-select-content-transform-origin);
	}
</style>
