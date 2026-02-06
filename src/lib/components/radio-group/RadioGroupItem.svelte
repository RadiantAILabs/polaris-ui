<!-- A radio group item, to be used within a RadioGroup.Root -->
<script lang="ts" module>
	import { RadioGroup as RadioGroupPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
</script>

<script lang="ts">
	import RadioButton from './RadioButton.svelte';

	let {
		ref = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item bind:ref {...restProps}>
	{#snippet child({ props, checked })}
		<RadioButton {...props} {checked} />
	{/snippet}
</RadioGroupPrimitive.Item>

<style lang="scss">
	@use './RadioButton';
</style>
