<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	// Exclude input types that are not supported by this component
	type InputType = Exclude<
		HTMLInputTypeAttribute,
		'button' | 'checkbox' | 'file' | 'image' | 'radio' | 'range' | 'reset' | 'submit'
	>;
	export type InputProps = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> & {
			type?: InputType;
		}
	> & {
		icon?: IconName;
		/** Field name displayed inside the input before the value. */
		label?: string;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		value = $bindable(),
		type = 'text',
		class: className,
		icon,
		label,
		'aria-invalid': ariaInvalid,
		disabled = false,
		...restProps
	}: InputProps = $props();

	const uid = $props.id();
	const labelId = `${uid}-label`;
</script>

<div class={cn('input-wrapper', ariaInvalid && 'input-wrapper--error', className)}>
	{#if icon}
		<Icon name={icon} size="0.75rem" aria-hidden="true" variant="tertiary" {disabled} />
	{/if}
	{#if label}
		<span id={labelId} class="input-label">{label}</span>
	{/if}
	<input
		bind:this={ref}
		class="input"
		{type}
		bind:value
		aria-invalid={ariaInvalid}
		aria-labelledby={label ? labelId : undefined}
		{disabled}
		{...restProps}
	/>
</div>

<style lang="scss">
	@use './Input';
</style>
