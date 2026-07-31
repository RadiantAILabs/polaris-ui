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
					<Icon name={icon} variant="secondary" size="base" />
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
				<Icon name={trailingIcon} size="base" variant="secondary" />
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

<style lang="scss">
	@use './ListCard';
</style>
