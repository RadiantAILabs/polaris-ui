<script lang="ts" generics="T extends { value: string; label: string; disabled?: boolean }">
	import { Select as SelectPrimitive, type WithoutChildren } from 'bits-ui';
	import DropdownSelector from '.';
	import type { IconName } from '../icon';

	export type DropdownSelectorProps<
		T extends { value: string; label: string; disabled?: boolean }
	> = Omit<WithoutChildren<SelectPrimitive.RootProps>, 'children'> & {
		placeholder?: string;
		contentProps?: WithoutChildren<SelectPrimitive.Content>;
		showAsBadges?: boolean;
		allowDelete?: boolean;
		items?: T[];
		variant?: 'default' | 'invisible';
		class?: string;
		icon?: IconName;
		fullWidth?: boolean;
		// Form control props for Select.Trigger
		name?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
		'aria-required'?: boolean;
		'aria-busy'?: boolean;
	};

	let {
		// Form control props for Select.Trigger
		name,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage,
		'aria-required': ariaRequired,
		'aria-busy': ariaBusy,
		// Placeholder text
		placeholder,
		// Select.Content props
		contentProps,
		// Whether to display selected items as badges
		showAsBadges = true,
		// Whether to allow deleting badges
		allowDelete = false,
		// Variant for trigger styling
		variant = 'default',
		// Class name for styling
		class: className,
		// Icon customization
		icon = 'chevron-down',
		// Width control
		fullWidth = true,
		// Select.Root props
		type,
		value = $bindable(),
		onValueChange,
		disabled,
		items,
		...restProps
	}: DropdownSelectorProps<T> = $props();

	const selectedItems = $derived(
		type === 'multiple' && Array.isArray(value) && items
			? items.filter((item: T) => (value as string[]).includes(item.value))
			: type === 'single' && typeof value === 'string' && items
				? items.filter((item: T) => item.value === value)
				: []
	);

	function handleBadgeDelete(itemValue: string) {
		if (disabled || !showAsBadges || !allowDelete) return;

		if (type === 'multiple' && Array.isArray(value)) {
			const newValue = value.filter((v) => v !== itemValue);
			value = newValue;
			(onValueChange as ((value: string[]) => void) | undefined)?.(newValue);
		} else {
			value = undefined;
			// For single select, call onValueChange with empty string to indicate cleared
			(onValueChange as ((value: string) => void) | undefined)?.('');
		}
	}
</script>

{#snippet selectContent(selectType: 'single' | 'multiple')}
	<DropdownSelector.Trigger
		{name}
		{disabled}
		{placeholder}
		value={selectedItems}
		{showAsBadges}
		{allowDelete}
		{variant}
		class={className}
		{icon}
		{fullWidth}
		onBadgeDelete={handleBadgeDelete}
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		aria-describedby={ariaDescribedby}
		aria-invalid={ariaInvalid}
		aria-errormessage={ariaErrormessage}
		aria-required={ariaRequired}
		aria-busy={ariaBusy}
	/>

	<DropdownSelector.Content {...contentProps}>
		{#if items && items.length === 0}
			<div class="no-options">No options</div>
		{:else if items}
			{#each items as { value, label, disabled } (value)}
				<DropdownSelector.Item
					{value}
					{label}
					{disabled}
					isMultiSelect={selectType === 'multiple'}
				/>
			{/each}
		{/if}
	</DropdownSelector.Content>
{/snippet}

{#if type === 'multiple'}
	<DropdownSelector.Root
		type="multiple"
		bind:value={value as string[]}
		onValueChange={onValueChange as (value: string[]) => void}
		{disabled}
		{items}
		{name}
		{...restProps}
	>
		{@render selectContent('multiple')}
	</DropdownSelector.Root>
{:else}
	<DropdownSelector.Root
		type="single"
		bind:value={value as string}
		onValueChange={onValueChange as (value: string) => void}
		{disabled}
		{items}
		{name}
		{...restProps}
	>
		{@render selectContent('single')}
	</DropdownSelector.Root>
{/if}

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.no-options {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: var(--color-text-primary);
  text-align: center;
}</style>
