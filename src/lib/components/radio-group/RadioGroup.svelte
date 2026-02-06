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

<style lang="scss">
	@use '../../styles/tokens' as *;

	.radio-group {
		display: flex;
		flex-direction: column;
		gap: $space-2;

		&__item {
			display: flex;
			gap: $space-1;
			align-items: center;
		}

		&__label {
			color: var(--color-text-secondary);

			@include typography('label');

			&--disabled {
				color: var(--color-text-disabled);
			}
		}
	}
</style>
