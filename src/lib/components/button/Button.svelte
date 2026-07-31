<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';
	import { CounterBadge } from '../counter-badge';
	import { Badge } from '../badge';

	export const buttonVariants = tv({
		base: 'btn',
		variants: {
			variant: {
				primary: 'btn--primary',
				secondary: 'btn--secondary',
				invisible: 'btn--invisible',
				destructive: 'btn--destructive'
			},
			size: {
				small: 'btn--small',
				base: 'btn--base',
				large: 'btn--large'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'base'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
	export type IconPosition = 'left' | 'right';
	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			label?: string;
			icon?: IconName;
			iconPosition?: IconPosition;
			counterBadge?: number;
			badge?: string;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'primary',
		size = 'base',
		label,
		icon,
		iconPosition = 'right',
		counterBadge,
		badge,
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		...restProps
	}: ButtonProps = $props();

	// Auto-detect icon-only mode if no label provided
	const isIconOnly = $derived(icon && !label);
	const iconVariant = $derived(
		variant === 'primary' || variant === 'destructive' ? 'inverse-primary' : 'primary'
	);

	// Determine badge size based on button size
	const badgeSize = $derived(size === 'small' ? 'small' : 'base');

	// Determine badge variant based on button variant and disabled state
	const badgeVariant = $derived(
		(variant === 'primary' || variant === 'destructive') && !disabled ? 'inverse' : 'default'
	);
</script>

{#if href}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		bind:this={ref}
		class={cn(
			buttonVariants({ variant, size }),
			isIconOnly && 'btn--icon-only',
			icon && !isIconOnly && iconPosition === 'left' && 'btn--has-left-icon',
			icon && !isIconOnly && iconPosition === 'right' && 'btn--has-right-icon',
			className
		)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{#if icon && iconPosition === 'left'}
			<Icon variant={iconVariant} {disabled} name={icon} size="base" />
		{/if}
		{#if label}
			{label}
		{/if}
		{#if badge}
			<div
				class={cn(
					(label || (icon && iconPosition === 'left')) && 'btn__badge-margin-left',
					icon && iconPosition === 'right' && 'btn__badge-margin-right'
				)}
			>
				<Badge text={badge} size={badgeSize} variant={badgeVariant} disabled={disabled ?? false} />
			</div>
		{/if}
		{#if icon && iconPosition === 'right'}
			<Icon variant={iconVariant} {disabled} name={icon} size="base" />
		{/if}
		<div class="btn__counter-badge">
			{#if counterBadge}
				<CounterBadge value={counterBadge} />
			{/if}
		</div>
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(
			buttonVariants({ variant, size }),
			isIconOnly && 'btn--icon-only',
			icon && !isIconOnly && iconPosition === 'left' && 'btn--has-left-icon',
			icon && !isIconOnly && iconPosition === 'right' && 'btn--has-right-icon',
			className
		)}
		{type}
		{disabled}
		{...restProps}
	>
		{#if icon && iconPosition === 'left'}
			<Icon variant={iconVariant} {disabled} name={icon} size="base" />
		{/if}
		{#if label}
			{label}
		{/if}
		{#if badge}
			<div
				class={cn(
					(label || (icon && iconPosition === 'left')) && 'btn__badge-margin-left',
					icon && iconPosition === 'right' && 'btn__badge-margin-right'
				)}
			>
				<Badge text={badge} size={badgeSize} variant={badgeVariant} disabled={disabled ?? false} />
			</div>
		{/if}
		{#if icon && iconPosition === 'right'}
			<Icon variant={iconVariant} {disabled} name={icon} size="base" />
		{/if}
		<div class="btn__counter-badge">
			{#if counterBadge}
				<CounterBadge value={counterBadge} />
			{/if}
		</div>
	</button>
{/if}

<style lang="scss">
	@use './Button';
</style>
