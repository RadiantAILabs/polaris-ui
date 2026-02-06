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

<style lang="scss">
	@use '../../styles/tokens' as *;

	// Item styles
	.item {
		display: flex;
		gap: $space-2;
		align-items: center;
		align-self: stretch;
		padding: $space-1;
		cursor: pointer;
		outline: none;
		border-radius: $border-radius-base;

		&:hover,
		&[data-highlighted] {
			background-color: var(--color-button-background-active);
		}

		&:focus-visible {
			outline: none;
			background-color: var(--color-button-background-active);
		}

		&[data-disabled] {
			cursor: not-allowed;
			background-color: transparent;
		}
	}

	.item-text {
		@include typography('button-base');

		flex: 1;
		min-width: 0;
		color: var(--color-text-primary);

		.item[data-disabled] & {
			color: var(--color-text-disabled);
		}
	}
</style>
