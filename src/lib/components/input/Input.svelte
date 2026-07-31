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
		/** Field name displayed inside the input, before the value. */
		label?: string;
		/** Show a trailing clear button while the input has a value. */
		clearable?: boolean;
		/**
		 * Optional side-effect hook fired when the clear button is pressed. The value is
		 * already cleared via an `input` event, so this is not needed to reset state.
		 */
		onClear?: () => void;
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
		clearable = false,
		onClear,
		'aria-invalid': ariaInvalid,
		id,
		disabled = false,
		...restProps
	}: InputProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);

	const hasValue = $derived(value != null && String(value).length > 0);
	const showClear = $derived(clearable && !disabled && hasValue);

	function handleClear() {
		if (ref instanceof HTMLInputElement) {
			ref.value = '';
			ref.dispatchEvent(new Event('input', { bubbles: true }));
		}
		onClear?.();
		ref?.focus();
	}
</script>

<div class={cn('input-wrapper', ariaInvalid && 'input-wrapper--error', className)}>
	{#if icon}
		<span class="input-leading-icon">
			<Icon name={icon} size="small" aria-hidden="true" variant="tertiary" {disabled} />
		</span>
	{/if}
	{#if label}
		<label for={inputId} class={cn('input-label', hasValue && 'input-label--filled')}>{label}</label
		>
	{/if}
	<input
		bind:this={ref}
		id={inputId}
		class="input"
		{type}
		bind:value
		aria-invalid={ariaInvalid}
		{disabled}
		{...restProps}
	/>
	{#if showClear}
		<button
			type="button"
			class="input-clear"
			aria-label="Clear search"
			onpointerdown={(event) => event.preventDefault()}
			onclick={handleClear}
		>
			<Icon name="cross" size="small" aria-hidden="true" variant="secondary" />
		</button>
	{/if}
</div>

<style lang="scss">
	@use './Input';
</style>
