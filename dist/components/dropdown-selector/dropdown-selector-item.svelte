<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { Checkbox } from '../checkbox';
	import RadioButton from '../radio-group/RadioButton.svelte';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		disabled,
		isMultiSelect = false,
		children,
		...restProps
	}: Omit<SelectPrimitive.ItemProps, 'children'> & {
		isMultiSelect?: boolean;
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	} = $props();
</script>

<SelectPrimitive.Item bind:ref {value} {label} {disabled} class={className} {...restProps}>
	{#snippet child({ props, selected })}
		<div {...props} class="item">
			{#if isMultiSelect}
				<Checkbox checked={selected} {disabled} />
			{:else}
				<RadioButton checked={selected} {disabled} />
			{/if}
			<span class="item-text">
				{#if children}
					{@render children({
						selected,
						highlighted: props['data-highlighted'] !== undefined
					})}
				{:else}
					{label || value}
				{/if}
			</span>
		</div>
	{/snippet}
</SelectPrimitive.Item>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
}
.item:hover, .item[data-highlighted] {
  background-color: var(--color-button-background-active);
}
.item:focus-visible {
  outline: none;
  background-color: var(--color-button-background-active);
}
.item[data-disabled] {
  cursor: not-allowed;
  background-color: transparent;
}

.item-text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex: 1;
  min-width: 0;
  color: var(--color-text-primary);
}
.item[data-disabled] .item-text {
  color: var(--color-text-disabled);
}</style>
