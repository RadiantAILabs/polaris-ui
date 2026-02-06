<script lang="ts">
	import Button from '../button/Button.svelte';
	import type { ButtonVariant, IconPosition } from '../button/Button.svelte';
	import { Badge, type BadgeProps } from '../badge';
	import { Icon, type IconName } from '../icon';
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// TODO consider refracting props like LargeOverlayDropdown, as this
	// component is no longer composable, we should rely more on slots and
	// provide building blocks where needed
	export type ListCardProps = WithElementRef<HTMLButtonAttributes> & {
		primaryText: string;
		secondaryText?: string;
		icon?: IconName;
		badgeText?: string;
		badgeLeadingIcon?: IconName;
		badgeIconProps?: BadgeProps['iconProps'];
		trailingIcon?: IconName;
		buttonLabel?: string;
		buttonVariant?: ButtonVariant;
		buttonIcon?: IconName;
		buttonIconPosition?: IconPosition;
		onButtonClick?: () => void;
		isActive?: boolean;
		size?: 'base' | 'large';
	};

	let {
		primaryText,
		secondaryText,
		icon,
		badgeText,
		badgeLeadingIcon,
		badgeIconProps,
		trailingIcon,
		buttonLabel,
		buttonVariant = 'secondary',
		buttonIcon,
		buttonIconPosition = 'right',
		onButtonClick,
		isActive = false,
		size = 'base',
		ref = $bindable(null),
		class: className,
		...restProps
	}: ListCardProps = $props();
</script>

<button
	bind:this={ref}
	class={cn('list-card', `list-card--size-${size}`, { 'list-card--active': isActive }, className)}
	type="button"
	{...restProps}
>
	<div class="list-card__container">
		<div class="list-card__text">
			<div class="list-card__primary-text">
				{#if icon}
					<Icon name={icon} variant="secondary" size="1rem" />
				{/if}
				<span class="list-card__primary-text-content">{primaryText}</span>
			</div>
			{#if secondaryText}
				<div class="list-card__secondary-text">
					{secondaryText}
				</div>
			{/if}
		</div>

		<div class="list-card__actions">
			{#if badgeText}
				<Badge text={badgeText} leadingIcon={badgeLeadingIcon} iconProps={badgeIconProps} />
			{/if}
			{#if trailingIcon}
				<Icon name={trailingIcon} size="1rem" variant="secondary" />
			{/if}
			{#if buttonLabel || buttonIcon}
				<Button
					label={buttonLabel}
					variant={buttonVariant}
					size="small"
					icon={buttonIcon}
					iconPosition={buttonIconPosition}
					disabled={restProps.disabled}
					onclick={onButtonClick}
				/>
			{/if}
		</div>
	</div>
</button>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.list-card {
  width: 100%;
  padding: 0;
  background-color: var(--color-background-raised);
  border: 1px solid var(--color-control-border-rest);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .list-card {
    transition: all 150ms ease-in-out;
  }
}
.list-card--size-large {
  padding: 0.5rem;
}
.list-card--active, .list-card:active {
  background-color: var(--color-control-background-active);
  border-color: var(--color-control-border-active);
}
.list-card__container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .list-card__container {
    transition: all 150ms ease-in-out;
  }
}
.list-card__container:focus-visible, .list-card__container:hover {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}
.list-card__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex: 1;
  gap: 1rem;
  align-items: center;
  min-width: 0;
}
.list-card--size-large .list-card__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  gap: 1.5rem;
}
.list-card__primary-text {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  min-width: 0;
  color: var(--color-text-primary);
}
.list-card--size-large .list-card__primary-text {
  gap: 0.75rem;
}
.list-card__primary-text-content {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-card__secondary-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.list-card__actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
}
.list-card--size-large .list-card__actions {
  gap: 1.5rem;
}</style>
