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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.collapsible-window {
  width: 100%;
}
.collapsible-window.border-top {
  border-top: 0.5px solid var(--color-border-base);
}
.collapsible-window.border-bottom {
  border-bottom: 0.5px solid var(--color-border-base);
}
.collapsible-window__trigger {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  color: var(--color-text-primary);
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.collapsible-window__trigger:disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
  background-color: var(--color-background-disabled);
}
.collapsible-window__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;
}
.collapsible-window__icon[data-state=open] {
  transform: rotate(90deg);
}
.collapsible-window__label {
  flex: 1;
  width: 100%;
  min-width: 0;
  text-align: left;
}
.collapsible-window__content {
  display: none;
}
.collapsible-window__content.open {
  display: block;
}
.collapsible-window__inner {
  padding: 0 1rem 1rem;
  text-align: left;
}</style>
