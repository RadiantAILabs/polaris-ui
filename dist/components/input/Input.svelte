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
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		value = $bindable(),
		type = 'text',
		class: className,
		icon,
		'aria-invalid': ariaInvalid,
		disabled = false,
		...restProps
	}: InputProps = $props();
</script>

<div class={cn('input-wrapper', ariaInvalid && 'input-wrapper--error', className)}>
	{#if icon}
		<Icon name={icon} size="0.75rem" aria-hidden="true" variant="tertiary" {disabled} />
	{/if}
	<input
		bind:this={ref}
		class="input"
		{type}
		bind:value
		aria-invalid={ariaInvalid}
		{disabled}
		{...restProps}
	/>
</div>

<style>/* stylelint-disable property-no-vendor-prefix */
/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: calc(0.5rem - 1px);
  background-color: var(--color-control-background-rest);
  border: 1px solid;
  border-color: var(--color-control-border-rest);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .input-wrapper {
    transition: all 150ms ease-in-out;
  }
}

.input {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex: 1;
  min-width: 0;
  padding: 0;
  color: var(--color-text-primary);
  outline: none;
  background: transparent;
  border: none;
}
.input::placeholder {
  color: var(--color-text-tertiary);
}
.input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px var(--color-control-background-rest) inset !important;
  -webkit-text-fill-color: var(--color-text-primary) !important;
}
.input:-webkit-autofill:hover {
  -webkit-box-shadow: 0 0 0 30px var(--color-control-background-hover) inset !important;
  -webkit-text-fill-color: var(--color-text-primary) !important;
}
.input:-webkit-autofill:focus, .input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--color-control-background-active) inset !important;
  -webkit-text-fill-color: var(--color-text-primary) !important;
}
.input[type=search]::-ms-clear, .input[type=search]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
.input[type=search]::-webkit-search-decoration, .input[type=search]::-webkit-search-cancel-button, .input[type=search]::-webkit-search-results-button, .input[type=search]::-webkit-search-results-decoration {
  display: none;
}

.input-wrapper:has([disabled]) {
  pointer-events: none;
  cursor: not-allowed;
  background-color: var(--color-background-disabled);
  border-color: var(--color-control-border-disabled);
}

.input-wrapper:hover:not(:has([disabled])) {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}

.input-wrapper:focus-within:not(:has([disabled])) {
  background-color: var(--color-control-background-active);
  border-color: var(--color-control-border-active);
}

.input-wrapper--error {
  border-color: var(--color-control-border-error);
}
.input-wrapper--error:hover:not(:has([disabled])) {
  border-color: var(--color-control-border-error);
}
.input-wrapper--error:focus-within:not(:has([disabled])) {
  border-color: var(--color-control-border-error);
}</style>
