<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { RadioGroupItem } from '.';

	type Item = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	type Props = WithoutChildrenOrChild<RadioGroupPrimitive.RootProps> & {
		items: Item[];
	};

	let { ref = $bindable(null), value = $bindable(''), items = [], ...restProps }: Props = $props();

	const uid = $props.id();
</script>

<RadioGroupPrimitive.Root bind:ref bind:value {...restProps}>
	<div class="radio-group">
		{#each items as item, index (item.value)}
			{@const id = `${uid}-${index}`}
			<div class="radio-group__item">
				<RadioGroupItem {id} value={item.value} disabled={item.disabled} />
				<label
					for={id}
					class="radio-group__label"
					class:radio-group__label--disabled={item.disabled}
				>
					{item.label}
				</label>
			</div>
		{/each}
	</div>
</RadioGroupPrimitive.Root>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.radio-group__item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.radio-group__label {
  color: var(--color-text-secondary);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.radio-group__label--disabled {
  color: var(--color-text-disabled);
}</style>
