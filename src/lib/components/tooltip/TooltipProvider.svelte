<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { setTooltipProviderContext } from './tooltip-context.js';

	export interface TooltipProviderProps {
		/** App subtree that shares this tooltip provider. */
		children: Snippet;
		/** Hover delay in milliseconds before a tooltip opens. */
		delayDuration?: number;
		/** Grace period in milliseconds during which the next tooltip opens without re-delaying. */
		skipDelayDuration?: number;
		/** Prevents tooltips from remaining open when hovering over their content. */
		disableHoverableContent?: boolean;
		/** When `true`, tooltips will not close when their trigger is clicked. */
		disableCloseOnTriggerClick?: boolean;
	}

	let {
		children,
		delayDuration = 200,
		skipDelayDuration,
		disableHoverableContent,
		disableCloseOnTriggerClick
	}: TooltipProviderProps = $props();

	setTooltipProviderContext();
</script>

<TooltipPrimitive.Provider
	{delayDuration}
	{skipDelayDuration}
	{disableHoverableContent}
	{disableCloseOnTriggerClick}
>
	{@render children()}
</TooltipPrimitive.Provider>
