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
		label,
		placeholder,
		value = [],
		showAsBadges = true,
		allowDelete = false,
		disabled,
		onBadgeDelete,
		clearable = false,
		onClear,
		variant = 'default',
		icon = 'chevron-down',
		fullWidth = true,
		...restProps
	}: Omit<WithoutChild<SelectPrimitive.TriggerProps>, 'value'> & {
		value?: T[];
		label?: string;
		showAsBadges?: boolean;
		allowDelete?: boolean;
		onBadgeDelete?: (value: T['value']) => void;
		/**
		 * Whether to show the clear affordance. When `true`, the trailing chevron
		 * is replaced with a clear ("x") button while there's a selection.
		 */
		clearable?: boolean;
		/** Called when the user clicks the clear affordance. */
		onClear?: () => void;
		variant?: 'default' | 'invisible';
		icon?: IconName;
		fullWidth?: boolean;
	} = $props();

	const hasSelectedItems = $derived(value.length > 0);

	function handleBadgeDelete(itemValue: string) {
		if (disabled || !showAsBadges || !allowDelete) return;
		onBadgeDelete?.(itemValue);
	}

	function handleClear(e: Event) {
		e.stopPropagation();
		if (disabled) return;
		onClear?.();
	}
</script>

<SelectPrimitive.Trigger bind:ref {disabled} {...restProps}>
	{#snippet child({ props })}
		<div class={cn('trigger-wrapper', fullWidth && 'full-width')}>
			<button class={cn('trigger', variant, fullWidth && 'full-width', className)} {...props}>
				{#if children}
					{@render children()}
				{:else}
					{#if label}
						<span class="label">{label}</span>
					{/if}

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

					<div class="icon" aria-hidden={hasSelectedItems && clearable ? 'true' : undefined}>
						<Icon name={hasSelectedItems && clearable ? 'cross' : icon} size="0.75rem" />
					</div>
				{/if}
			</button>

			{#if hasSelectedItems && clearable}
				<button
					type="button"
					class="clear-button"
					{disabled}
					aria-label="Clear selection"
					onpointerdown={(e) => e.stopPropagation()}
					onclick={handleClear}
				>
					<Icon name="cross" size="0.75rem" variant="secondary" />
				</button>
			{/if}
		</div>
	{/snippet}
</SelectPrimitive.Trigger>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.trigger-wrapper {
		position: relative;
		display: inline-flex;

		&.full-width {
			width: 100%;
		}
	}

	// Trigger styles
	.trigger {
		display: flex;
		gap: $space-0-5;
		align-items: center;
		justify-content: space-between;
		width: auto;
		min-height: $space-4;
		padding: $space-0-5 $space-1 $space-0-5 $space-0-5;
		cursor: pointer;
		background-color: var(--color-control-background-rest);
		border: none;
		border-radius: $border-radius-base;
		box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-rest);

		@include transition-interactive;

		&.full-width {
			width: 100%;
		}

		&:hover {
			background-color: var(--color-control-background-hover);
			box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-hover);
		}

		&[data-state='open'],
		&:focus-visible {
			outline: none;
			background-color: var(--color-control-background-active);
			box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-active);
		}

		&[data-disabled] {
			cursor: not-allowed;
			background-color: var(--color-background-disabled);
			box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-disabled);
		}

		&[aria-invalid='true'] {
			box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-error);

			&:hover {
				box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-error);
			}

			&[data-state='open'],
			&:focus-visible {
				box-shadow: inset 0 0 0 $border-width-base var(--color-control-border-error);
			}
		}

		&.invisible {
			background-color: transparent;
			box-shadow: none;

			&:hover {
				background-color: var(--color-button-background-hover);
				box-shadow: none;
			}

			&[data-state='open'],
			&:focus-visible {
				background-color: var(--color-button-background-active);
				box-shadow: none;
			}

			&[data-disabled] {
				background-color: transparent;
				box-shadow: none;
			}
		}
	}

	.label {
		@include typography('body-base-regular');

		flex-shrink: 0;
		padding-left: $space-0-5;
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	.placeholder {
		@include typography('body-base-regular');

		flex: 1;
		padding-left: $space-0-5;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--color-text-tertiary);
		text-align: left;
		white-space: nowrap;
	}

	.selected-text {
		@include typography('body-base-regular');

		flex: 1;
		padding-left: $space-0-5;
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
		gap: $space-1;
		align-items: center;
		min-width: 0;
	}

	.icon {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: var(--color-icon-secondary);

		// Rotate icon when dropdown is open
		.trigger[data-state='open'] & {
			transform: rotate(180deg);
		}

		.trigger[data-disabled] & {
			color: var(--color-icon-disabled);
		}
	}

	.clear-button {
		position: absolute;
		top: 50%;
		right: calc(#{$space-1} - #{$space-0-25});
		display: flex;
		align-items: center;
		justify-content: center;
		padding: $space-0-25;
		color: var(--color-icon-secondary);
		cursor: pointer;
		background: transparent;
		border: none;
		border-radius: $border-radius-base;
		transform: translateY(-50%);

		@include transition-interactive;

		&:hover,
		&:focus-visible {
			background-color: var(--color-badge-delete-button-background-hover);
		}

		&:focus-visible {
			outline: none;
		}

		&:disabled {
			cursor: not-allowed;
		}
	}
</style>
