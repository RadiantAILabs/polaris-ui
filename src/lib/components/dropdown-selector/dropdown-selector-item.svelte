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

<SelectPrimitive.Item bind:ref {value} {label} {disabled} {...restProps}>
	{#snippet child({ props, selected })}
		<div {...props} class={['item', className]}>
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
	@use '../../styles/floating';

	.item {
		@include floating.item($managed-highlight: true);
	}

	.item-text {
		@include typography('button-base');

		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--color-text-primary);
		white-space: nowrap;

		.item[data-disabled] & {
			color: var(--color-text-disabled);
		}
	}
</style>
