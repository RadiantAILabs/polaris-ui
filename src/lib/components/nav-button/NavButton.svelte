<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	export type NavButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			icon: IconName;
			label: string;
			active?: boolean;
			expanded?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		icon,
		label,
		active = false,
		expanded = true,
		href = undefined,
		type = 'button',
		disabled,
		ref = $bindable(null),
		...restProps
	}: NavButtonProps = $props();
</script>

{#if href}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		bind:this={ref}
		class={cn('nav-btn', active && 'nav-btn--active', !expanded && 'nav-btn--collapsed', className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		aria-current={active ? 'page' : undefined}
		aria-label={!expanded ? label : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		<Icon variant="primary" {disabled} name={icon} size="base" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn('nav-btn', active && 'nav-btn--active', !expanded && 'nav-btn--collapsed', className)}
		{type}
		{disabled}
		aria-current={active ? 'page' : undefined}
		aria-label={!expanded ? label : undefined}
		{...restProps}
	>
		<Icon variant="primary" {disabled} name={icon} size="base" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</button>
{/if}

<style lang="scss">
	@use './NavButton';
</style>
