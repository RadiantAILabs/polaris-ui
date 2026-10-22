<script lang="ts">
	import type { WithoutChildren, DropdownMenu as Menu } from 'bits-ui';
	import { DropdownMenu as Primitive } from 'bits-ui';
	import { Button, type ButtonProps } from '../button';
	import { Icon, type IconName } from '../icon';
	import Content from './DropdownMenuContent.svelte';
	import Item from './DropdownMenuItem.svelte';

	export interface DropdownMenuProps extends WithoutChildren<Menu.RootProps> {
		buttonLabel?: string;
		buttonProps?: Omit<ButtonProps, 'disabled' | 'children' | 'label'>;
		items: (string | { label: string; icon?: IconName; href?: string; disabled?: boolean })[];
		contentProps?: Omit<Menu.ContentProps, 'children' | 'child'>;
		align?: 'start' | 'center' | 'end';
		disabled?: boolean;
		showIcons?: boolean;
		onSelect?: (label: string) => void;
	}
	let {
		open = $bindable(false),
		buttonLabel,
		buttonProps = { variant: 'secondary', icon: 'chevron-down', iconPosition: 'right' },
		items,
		contentProps,
		align = 'start',
		disabled,
		showIcons = true,
		onSelect,
		...props
	}: DropdownMenuProps = $props();
</script>

<Primitive.Root bind:open {...props}>
	<Primitive.Trigger {disabled}>
		{#snippet child({ props })}<Button label={buttonLabel} {...buttonProps} {...props} />{/snippet}
	</Primitive.Trigger>
	<Content {align} {...contentProps}>
		{#each items as item, index (index)}
			{@const option = typeof item === 'string' ? { label: item, icon: 'plus' as const } : item}
			{#if option.href}
				<Item disabled={option.disabled}>
					{#snippet child({ props })}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a {...props} href={option.disabled ? undefined : option.href}>
							{#if showIcons && option.icon}<Icon name={option.icon} size="base" />{/if}
							<span class="polaris-menu-text">{option.label}</span>
						</a>
					{/snippet}
				</Item>
			{:else}
				<Item
					icon={showIcons ? option.icon : undefined}
					disabled={option.disabled}
					onSelect={() => onSelect?.(option.label)}
				>
					{option.label}
				</Item>
			{/if}
		{:else}
			<div class="menu-empty" role="presentation">No options</div>
		{/each}
	</Content>
</Primitive.Root>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-menu-text {
		@include floating.text;
	}

	.menu-empty {
		padding: 8px;
		font-size: 13px;
		color: var(--color-text-tertiary);
	}
</style>
