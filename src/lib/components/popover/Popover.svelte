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
		triggerButtonProps: Omit<ButtonProps, 'disabled'>;
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

	let viewport: HTMLDivElement | undefined = $state();
	let content: HTMLDivElement | undefined = $state();
	let overflowing = $state(false);

	$effect(() => {
		if (!viewport || !content) return;
		const element = viewport;
		const measure = () => {
			overflowing = element.scrollHeight > element.clientHeight;
		};
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		observer.observe(content);
		measure();
		return () => observer.disconnect();
	});
</script>

<PopoverPrimitive.Root {...restProps}>
	<PopoverPrimitive.Trigger {disabled}>
		{#snippet child({ props })}
			<Button {...triggerButtonProps} {...props} />
		{/snippet}
	</PopoverPrimitive.Trigger>

	<PopoverPrimitive.Portal {...portalProps}>
		<PopoverPrimitive.Content {align} sideOffset={4} avoidCollisions={true} collisionPadding={8}>
			{#snippet child({ wrapperProps, props })}
				<div {...wrapperProps} transition:fade={{ duration: 150 }}>
					<div {...props} class={cn('popover', className)}>
						<div bind:this={viewport} class="popover__viewport scroll-area">
							<div bind:this={content} class="popover__content">
								{@render children?.()}
							</div>
						</div>

						{#if actions}
							<div class="popover__actions" class:popover__actions--divided={overflowing}>
								{@render actions()}
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
