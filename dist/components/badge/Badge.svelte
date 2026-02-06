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
		variant?: 'default' | 'inverse';
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
			<Icon name={leadingIcon} size={size === 'small' ? '0.625rem' : '0.75rem'} {...iconProps} />
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
			<Icon name="cross" size={size === 'small' ? '0.625rem' : '0.75rem'} variant="secondary" />
		</button>
	{/if}
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.badge {
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  color: var(--color-text-primary);
  user-select: none;
  background-color: var(--color-background-emphasized-1);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .badge {
    transition: all 150ms ease-in-out;
  }
}
.badge--small {
  height: 1rem;
}
.badge--base {
  height: 1.5rem;
}
.badge--large {
  height: 2rem;
  padding: 0 0.5rem;
}
.badge--disabled {
  opacity: 0.6;
}
.badge--inverse {
  color: var(--color-text-inverse-primary);
  background-color: var(--color-button-primary-background-active);
}

.badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.125rem;
}

.badge__text {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.badge--small .badge__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.badge__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 2px;
}
.badge--small .badge__delete {
  padding: 1px;
}
.badge__delete:disabled {
  pointer-events: none;
}
.badge__delete:hover:not(:disabled), .badge__delete:focus-visible:not(:disabled) {
  background-color: var(--color-badge-delete-button-background-hover);
}
@media (prefers-reduced-motion: no-preference) {
  .badge__delete {
    transition: all 150ms ease-in-out;
  }
}</style>
