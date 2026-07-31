<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { cn } from '../../utils';
	import { hasTooltipProviderContext } from './tooltip-context.js';
	import './Tooltip.scss';

	export interface TooltipProps {
		/** The trigger the tooltip is attached to, passed between the tags. */
		children?: Snippet;
		/**
		 * Render the trigger as a custom element instead of the default
		 * `.tooltip-trigger` wrapper.
		 */
		trigger?: Snippet<[{ props: Record<string, unknown> }]>;
		/** Plain-text tooltip body. */
		text?: string;
		/** Rich tooltip body. Takes precedence over [`text`] when both are set. */
		content?: Snippet;
		/** Side of the trigger the tooltip opens on. */
		side?: 'top' | 'right' | 'bottom' | 'left';
		/** Alignment of the tooltip along the chosen side. */
		align?: 'start' | 'center' | 'end';
		/** Gap in pixels between the trigger and the tooltip. */
		sideOffset?: number;
		/** Hover delay in milliseconds before the tooltip opens. Inherits from a surrounding provider when omitted. */
		delayDuration?: number;
		/** Prevents tooltip from remaining open when hovering over the content. Inherits from a surrounding provider when omitted. */
		disableHoverableContent?: boolean;
		/** Controls whether the tooltip is open. */
		open?: boolean;
		/** Whether the tooltip is suppressed. */
		disabled?: boolean;
		/** When `true`, the tooltip will not close when the trigger is clicked. Inherits from a surrounding provider when omitted. */
		disableCloseOnTriggerClick?: boolean;
		/** Additional CSS class on the tooltip surface. */
		class?: string;
	}

	let {
		children,
		trigger,
		text,
		content,
		side = 'top',
		align = 'center',
		sideOffset = 6,
		delayDuration,
		disableHoverableContent,
		open = $bindable(false),
		disabled = false,
		disableCloseOnTriggerClick,
		class: className
	}: TooltipProps = $props();

	const sharedProvider = hasTooltipProviderContext();
</script>

{#snippet tooltip()}
	<TooltipPrimitive.Root
		bind:open
		{disabled}
		{delayDuration}
		{disableHoverableContent}
		{disableCloseOnTriggerClick}
	>
		<TooltipPrimitive.Trigger>
			{#snippet child({ props })}
				{#if trigger}
					{@render trigger({ props })}
				{:else}
					<span {...props} class="tooltip-trigger">{@render children?.()}</span>
				{/if}
			{/snippet}
		</TooltipPrimitive.Trigger>

		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content {side} {align} {sideOffset}>
				{#snippet child({ props, wrapperProps, open: isOpen })}
					{#if isOpen}
						<div {...wrapperProps}>
							<div {...props} class={cn('tooltip', className)} transition:fade={{ duration: 100 }}>
								{#if content}
									{@render content()}
								{:else if text}
									{text}
								{/if}
							</div>
						</div>
					{/if}
				{/snippet}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	</TooltipPrimitive.Root>
{/snippet}

{#if sharedProvider}
	{@render tooltip()}
{:else}
	<TooltipPrimitive.Provider delayDuration={200}>
		{@render tooltip()}
	</TooltipPrimitive.Provider>
{/if}
