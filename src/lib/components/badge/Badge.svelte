<script lang="ts" module>
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../icon/icon-registry';
	import { Icon, type IconProps } from '../icon';

	export type BadgeProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		text?: string;
		leadingIcon?: IconName;
		iconProps?: Partial<Omit<IconProps, 'name' | 'size'>>;
		showDelete?: boolean;
		onDelete?: () => void;
		disabled?: boolean;
		size?: 'small' | 'base' | 'large';
		variant?: 'default' | 'outline' | 'inverse';
	};
</script>

<script lang="ts">
	let {
		text = 'Item',
		leadingIcon,
		iconProps,
		showDelete: allowDelete = false,
		onDelete,
		disabled = false,
		size = 'base',
		variant = 'default',
		ref = $bindable(null),
		...restProps
	}: BadgeProps = $props();

	function handleDelete(event: MouseEvent) {
		if (disabled) return;
		event.stopPropagation();
		event.preventDefault();
		onDelete?.();
	}

	function handleDeleteMouseDown(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
	}

	function handleDeletePointerDown(event: PointerEvent) {
		event.stopPropagation();
		event.preventDefault();
	}
</script>

<div
	bind:this={ref}
	class={cn(
		'badge',
		`badge--${size}`,
		`badge--${variant}`,
		{ 'badge--disabled': disabled },
		restProps.class
	)}
	{...restProps}
>
	{#if leadingIcon}
		<div class="badge__icon">
			<Icon
				name={leadingIcon}
				size={size === 'small' ? '0.625rem' : '0.75rem'}
				variant={variant === 'inverse' ? 'inverse-primary' : 'primary'}
				{...iconProps}
			/>
		</div>
	{/if}

	<div class="badge__text">
		{text}
	</div>

	{#if allowDelete}
		<button
			class="badge__delete"
			onclick={handleDelete}
			onmousedown={handleDeleteMouseDown}
			onpointerdown={handleDeletePointerDown}
			type="button"
			aria-label="Remove {text}"
			{disabled}
		>
			<Icon
				name="cross"
				size={size === 'small' ? '0.625rem' : '0.75rem'}
				variant={variant === 'inverse' ? 'inverse-primary' : 'secondary'}
			/>
		</button>
	{/if}
</div>

<style lang="scss">
	@use './Badge';
</style>
