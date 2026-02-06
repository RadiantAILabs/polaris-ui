<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover as PopoverPrimitive, type WithoutChildren } from 'bits-ui';
	import { cn } from '../../utils';
	import { Button, type ButtonProps } from '../button';
	import { fade } from 'svelte/transition';
	import './Popover.scss';

	export interface PopoverProps extends WithoutChildren<PopoverPrimitive.RootProps> {
		children?: Snippet;
		actions?: Snippet;
		triggerButtonProps: ButtonProps;
		portalProps?: PopoverPrimitive.PortalProps;
		align?: 'start' | 'end';
		disabled?: boolean;
		class?: string;
	}

	let {
		children,
		actions,
		triggerButtonProps = { variant: 'primary', size: 'base' },
		portalProps,
		align = 'start',
		disabled,
		class: className,
		...restProps
	}: PopoverProps = $props();

	function handleContentHeight(el: HTMLElement) {
		function updateHeight() {
			requestAnimationFrame(() => {
				const availableHeight = parseInt(
					window
						.getComputedStyle(el)
						.getPropertyValue('--bits-popover-content-available-height')
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

<PopoverPrimitive.Root {...restProps}>
	<PopoverPrimitive.Trigger>
		{#snippet child({ props })}
			<Button {...triggerButtonProps} {...props} {disabled} />
		{/snippet}
	</PopoverPrimitive.Trigger>

	<PopoverPrimitive.Portal {...portalProps}>
		<PopoverPrimitive.Content {align} sideOffset={8} avoidCollisions={true} collisionPadding={8}>
			{#snippet child({ wrapperProps, props })}
				<div {...wrapperProps} transition:fade={{ duration: 150 }}>
					<div {...props} class={cn('popover', className)} use:handleContentHeight>
						<div class="popover__content scroll-area">
							{@render children?.()}
						</div>

						{#if actions}
							<div class="popover__actions">
								{@render actions()}
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
