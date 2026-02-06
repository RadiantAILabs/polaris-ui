<script lang="ts" generics="T extends { value: string; label: string; disabled?: boolean }">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import { Icon } from '../icon';
	import { BadgeGroup } from '../badge';
	import { cn } from '../../utils';

	import type { IconName } from '../icon';

	let {
		ref = $bindable(null),
		class: className,
		children,
		placeholder,
		value = [],
		showAsBadges = true,
		allowDelete = false,
		disabled,
		onBadgeDelete,
		variant = 'default',
		icon = 'chevron-down',
		fullWidth = true,
		...restProps
	}: Omit<WithoutChild<SelectPrimitive.TriggerProps>, 'value'> & {
		value?: T[];
		showAsBadges?: boolean;
		allowDelete?: boolean;
		onBadgeDelete?: (value: T['value']) => void;
		variant?: 'default' | 'invisible';
		icon?: IconName;
		fullWidth?: boolean;
	} = $props();

	const hasSelectedItems = $derived(value.length > 0);

	function handleBadgeDelete(itemValue: string) {
		if (disabled || !showAsBadges || !allowDelete) return;
		onBadgeDelete?.(itemValue);
	}
</script>

<SelectPrimitive.Trigger bind:ref {disabled} {...restProps}>
	{#snippet child({ props })}
		<button class={cn('trigger', variant, fullWidth && 'full-width', className)} {...props}>
			{#if children}
				{@render children()}
			{:else}
				{#if hasSelectedItems}
					<div class="selected-items">
						{#if showAsBadges}
							<BadgeGroup
								badges={value.map((item: T) => ({
									text: item.label,
									showDelete: allowDelete,
									onDelete: () => handleBadgeDelete(item.value),
									disabled: !!disabled,
									'aria-label': `Remove ${item.label}`
								}))}
								dynamicSizing={true}
							/>
						{:else}
							<span class="selected-text">
								{value.map((item) => item.label).join(', ')}
							</span>
						{/if}
					</div>
				{:else}
					<span class="placeholder">{placeholder}</span>
				{/if}

				<div class="icon">
					<Icon name={icon} size="0.75rem" />
				</div>
			{/if}
		</button>
	{/snippet}
</SelectPrimitive.Trigger>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.trigger {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-between;
  width: auto;
  min-height: 2rem;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  cursor: pointer;
  background-color: var(--color-control-background-rest);
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px var(--color-control-border-rest);
}
@media (prefers-reduced-motion: no-preference) {
  .trigger {
    transition: all 150ms ease-in-out;
  }
}
.trigger.full-width {
  width: 100%;
}
.trigger:hover {
  background-color: var(--color-control-background-hover);
  box-shadow: inset 0 0 0 1px var(--color-control-border-hover);
}
.trigger[data-state=open], .trigger:focus-visible {
  outline: none;
  background-color: var(--color-control-background-active);
  box-shadow: inset 0 0 0 1px var(--color-control-border-active);
}
.trigger[data-disabled] {
  cursor: not-allowed;
  background-color: var(--color-background-disabled);
  box-shadow: inset 0 0 0 1px var(--color-control-border-disabled);
}
.trigger[aria-invalid=true] {
  box-shadow: inset 0 0 0 1px var(--color-control-border-error);
}
.trigger[aria-invalid=true]:hover {
  box-shadow: inset 0 0 0 1px var(--color-control-border-error);
}
.trigger[aria-invalid=true][data-state=open], .trigger[aria-invalid=true]:focus-visible {
  box-shadow: inset 0 0 0 1px var(--color-control-border-error);
}
.trigger.invisible {
  background-color: transparent;
  box-shadow: none;
}
.trigger.invisible:hover {
  background-color: var(--color-button-background-hover);
  box-shadow: none;
}
.trigger.invisible[data-state=open], .trigger.invisible:focus-visible {
  background-color: var(--color-button-background-active);
  box-shadow: none;
}
.trigger.invisible[data-disabled] {
  background-color: transparent;
  box-shadow: none;
}

.placeholder {
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
  padding-left: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-tertiary);
  text-align: left;
  white-space: nowrap;
}

.selected-text {
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
  padding-left: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-primary);
  text-align: left;
  white-space: nowrap;
}

.selected-items {
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
  min-width: 0;
}

.icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: var(--color-icon-secondary);
}
.trigger[data-state=open] .icon {
  transform: rotate(180deg);
}
.trigger[data-disabled] .icon {
  color: var(--color-icon-disabled);
}</style>
