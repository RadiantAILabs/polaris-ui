<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { Icon } from '../icon';
	import type { Snippet } from 'svelte';

	export type CollapsibleWindowProps = {
		open?: boolean;
		disabled?: boolean;
		trigger?: Snippet;
		content?: Snippet;
		ariaLabel?: string;
		onOpenChange?: (open: boolean) => void;
		borderTop?: boolean;
		borderBottom?: boolean;
	} & HTMLAttributes<HTMLDivElement>;

	let {
		open = $bindable(false),
		disabled = false,
		trigger,
		content,
		ariaLabel = 'Toggle collapsible content',
		onOpenChange,
		borderTop = true,
		borderBottom = true,
		...restProps
	}: CollapsibleWindowProps = $props();

	function toggle() {
		if (disabled) return;
		open = !open;
		onOpenChange?.(open);
	}
</script>

<div
	class="collapsible-window"
	class:border-top={borderTop}
	class:border-bottom={borderBottom}
	{...restProps}
>
	<button
		class="collapsible-window__trigger"
		type="button"
		{disabled}
		onclick={toggle}
		aria-label={ariaLabel}
		aria-expanded={open}
	>
		<div class="collapsible-window__icon" data-state={open ? 'open' : 'closed'}>
			<Icon {disabled} name="triangle-right" variant="primary" size="0.625rem" />
		</div>
		<span class="collapsible-window__label">
			{#if trigger}
				{@render trigger()}
			{/if}
		</span>
	</button>

	<div class="collapsible-window__content" class:open>
		<div class="collapsible-window__inner" class:open>
			{#if content}
				{@render content()}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use './CollapsibleWindow';
</style>
