<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { cn } from '../../utils';
	import './Tooltip.scss';

	export interface TooltipProps {
		/** The trigger the tooltip is attached to, passed between the tags. */
		children?: Snippet;
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
		/** Hover delay in milliseconds before the tooltip opens. */
		delayDuration?: number;
		/** Prevents tooltip from remaining open when hovering over the content. */
		disableHoverableContent?: boolean;
		/** Controls whether the tooltip is open. */
		open?: boolean;
		/** Whether the tooltip is suppressed. */
		disabled?: boolean;
		/** Additional CSS class on the tooltip surface. */
		class?: string;
	}

	let {
		children,
		text,
		content,
		side = 'top',
		align = 'center',
		sideOffset = 6,
		delayDuration = 200,
		disableHoverableContent = false,
		open = $bindable(false),
		disabled = false,
		class: className
	}: TooltipProps = $props();
</script>

<TooltipPrimitive.Provider {delayDuration} {disableHoverableContent}>
	<TooltipPrimitive.Root bind:open {disabled}>
		<TooltipPrimitive.Trigger>
			{#snippet child({ props })}
				<span {...props} class="tooltip-trigger">{@render children?.()}</span>
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
</TooltipPrimitive.Provider>
