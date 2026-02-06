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
			<Icon variant={iconVariant} {disabled} name={icon} size="1rem" />
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
			<Icon variant={iconVariant} {disabled} name={icon} size="1rem" />
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
			<Icon variant={iconVariant} {disabled} name={icon} size="1rem" />
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
			<Icon variant={iconVariant} {disabled} name={icon} size="1rem" />
		{/if}
		<div class="btn__counter-badge">
			{#if counterBadge}
				<CounterBadge value={counterBadge} />
			{/if}
		</div>
	</button>
{/if}

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.btn {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  border: 1px solid transparent;
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .btn {
    transition: all 150ms ease-in-out;
  }
}
.btn:disabled, .btn[aria-disabled=true] {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: not-allowed;
  background-color: var(--color-background-disabled);
  border-color: var(--color-control-border-disabled);
}

.btn--primary {
  color: var(--color-text-inverse-primary);
  background-color: var(--color-button-primary-background-rest);
  border-color: var(--color-button-border-base);
}
.btn--primary:hover:not(:disabled, [aria-disabled=true]), .btn--primary:focus-visible:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-primary-background-hover);
}
.btn--primary:active:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-primary-background-active);
}

.btn--destructive {
  color: var(--color-text-inverse-primary);
  background-color: var(--color-button-destructive-background-rest);
  border-color: var(--color-button-destructive-background-rest);
}
.btn--destructive:hover:not(:disabled, [aria-disabled=true]), .btn--destructive:focus-visible:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-destructive-background-hover);
  border-color: var(--color-button-destructive-background-hover);
}
.btn--destructive:active:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-destructive-background-active);
  border-color: var(--color-button-destructive-background-active);
}

.btn--secondary {
  color: var(--color-text-primary);
  background-color: var(--color-button-background-rest);
  border-color: var(--color-button-border-base);
}
.btn--secondary:hover:not(:disabled, [aria-disabled=true]), .btn--secondary:focus-visible:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-background-hover);
}
.btn--secondary:active:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-background-active);
}

.btn--invisible {
  color: var(--color-text-primary);
  background-color: transparent;
  border-color: transparent;
}
.btn--invisible:disabled, .btn--invisible[aria-disabled=true] {
  background-color: transparent;
  border-color: transparent;
}
.btn--invisible:hover:not(:disabled, [aria-disabled=true]), .btn--invisible:focus-visible:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-background-hover);
}
.btn--invisible:active:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-button-background-active);
}

.btn--small {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  gap: 0.25rem;
  height: 1.5rem;
  padding: calc(0.25rem - 1px) calc(0.5rem - 1px);
}

.btn--base {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  gap: 0.375rem;
  height: 2rem;
  padding: calc(0.5rem - 1px) calc(0.75rem - 1px);
}

.btn--large {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  gap: 0.375rem;
  height: 2.5rem;
  padding: calc(0.75rem - 1px) calc(1rem - 1px);
}

.btn--icon-only.btn--small {
  padding: calc(0.25rem - 1px);
}
.btn--icon-only.btn--base {
  padding: calc(0.5rem - 1px);
}
.btn--icon-only.btn--large {
  padding: calc(0.75rem - 1px);
}

.btn--has-left-icon.btn--small {
  padding-left: calc(0.25rem - 1px);
}
.btn--has-left-icon.btn--base {
  padding-left: calc(0.5rem - 1px);
}
.btn--has-left-icon.btn--large {
  padding-left: calc(0.75rem - 1px);
}

.btn--has-right-icon.btn--small {
  padding-right: calc(0.25rem - 1px);
}
.btn--has-right-icon.btn--base {
  padding-right: calc(0.5rem - 1px);
}
.btn--has-right-icon.btn--large {
  padding-right: calc(0.75rem - 1px);
}

.btn__badge-margin-left {
  margin-left: 0.25rem;
}

.btn__badge-margin-right {
  margin-right: 0.25rem;
}

.btn__counter-badge {
  position: absolute;
  top: -0.7em;
  right: -0.7em;
}</style>
