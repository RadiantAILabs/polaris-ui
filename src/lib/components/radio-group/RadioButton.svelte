<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import { type WithElementRef } from '../../utils';

	export type RadioButtonProps = WithElementRef<HTMLAttributes<HTMLButtonElement>> & {
		checked?: boolean;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	let {
		checked = false,
		disabled = false,
		ref = $bindable(null),
		...restProps
	}: RadioButtonProps = $props();
</script>

<button
	bind:this={ref}
	class="radio-button"
	type="button"
	role="radio"
	aria-checked={checked}
	{disabled}
	{...restProps}
>
	{#if checked}
		<div class="radio-button__fill"></div>
	{/if}
</button>

<style lang="scss">
	@use './RadioButton';
</style>
