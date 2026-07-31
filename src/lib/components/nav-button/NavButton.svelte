<script lang="ts" module>
	import { cn } from '../../utils';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	export type NavButtonProps = {
		icon: IconName;
		label: string;
		active?: boolean;
		expanded?: boolean;
		href?: string;
		disabled?: boolean;
		class?: string;
		ref?: HTMLElement | null;
		onclick?: (event: MouseEvent) => void;
	};
</script>

<script lang="ts">
	let {
		class: className,
		icon,
		label,
		active = false,
		expanded = true,
		href,
		disabled,
		onclick,
		ref = $bindable(null)
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
		{onclick}
	>
		<Icon variant="primary" {disabled} name={icon} size="base" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn('nav-btn', active && 'nav-btn--active', !expanded && 'nav-btn--collapsed', className)}
		type="button"
		{disabled}
		aria-current={active ? 'page' : undefined}
		aria-label={!expanded ? label : undefined}
		{onclick}
	>
		<Icon variant="primary" {disabled} name={icon} size="base" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</button>
{/if}

<style lang="scss">
	@use './NavButton';
</style>
