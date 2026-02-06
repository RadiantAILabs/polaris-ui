<script lang="ts">
	import { DropdownMenu, type WithoutChildren } from 'bits-ui';
	import { Button, type ButtonProps } from '../button';
	import type { IconName } from '../icon/icon-registry';

	export type DropdownMenuProps = WithoutChildren<DropdownMenu.RootProps> & {
		buttonLabel: string;
		buttonProps?: Omit<ButtonProps, 'disabled' | 'children'>;
		items: string[] | Array<{ label: string; icon?: IconName; href?: string }>;
		contentProps?: WithoutChildren<DropdownMenu.ContentProps>;
		align?: 'start' | 'end';
		disabled?: boolean;
		showIcons?: boolean;
		onSelect?: (value: string) => void;
	};

	let {
		open = $bindable(false),
		items,
		buttonLabel,
		buttonProps = { variant: 'secondary', icon: 'chevron-down', iconPosition: 'right' },
		contentProps,
		align = 'start',
		disabled = false,
		showIcons = true,
		onSelect,
		...restProps
	}: DropdownMenuProps = $props();

	function handleContentHeight(el: HTMLElement) {
		function updateHeight() {
			requestAnimationFrame(() => {
				const availableHeight = parseInt(
					window
						.getComputedStyle(el)
						.getPropertyValue('--bits-dropdown-menu-content-available-height')
						.replace('px', '')
				);

				if (!isNaN(availableHeight)) {
					// Set max height
					el.style.maxHeight = `${availableHeight}px`;
				}
			});
		}

		// Initial height calculation
		updateHeight();

		// Add resize listener to recalculate on window resize
		const handleResize = () => updateHeight();
		window.addEventListener('resize', handleResize);

		// Cleanup function
		return {
			destroy() {
				window.removeEventListener('resize', handleResize);
			}
		};
	}
</script>

<!-- TODO break this component down into smaller components for better maintainability, like was done
for the DropdownSelector component -->

<DropdownMenu.Root bind:open {...restProps}>
	<DropdownMenu.Trigger {disabled}>
		{#snippet child({ props })}
			<Button {...buttonProps} {...props} {disabled} label={buttonLabel} />
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			sideOffset={8}
			avoidCollisions={true}
			collisionPadding={8}
			{align}
			{...contentProps}
		>
			{#snippet child({ wrapperProps, props })}
				<div {...wrapperProps}>
					<div {...props} class="dropdown-menu__content scroll-area" use:handleContentHeight>
						{#if items.length === 0}
							<div class="dropdown-menu__no-options">No options</div>
						{:else}
							{#each items as item (typeof item === 'string' ? item : item.label)}
								{@const itemLabel = typeof item === 'string' ? item : item.label}
								{@const itemIcon = showIcons
									? typeof item === 'string'
										? 'plus'
										: item.icon
									: undefined}
								{@const itemHref = typeof item === 'string' ? undefined : item.href}
								<DropdownMenu.Item
									textValue={itemLabel}
									onSelect={() => !itemHref && onSelect?.(itemLabel)}
									style="width: 100%; "
								>
									<Button
										variant="invisible"
										label={itemLabel}
										icon={itemIcon}
										iconPosition="left"
										href={itemHref}
										style="justify-content: flex-start; width: 100%; "
									/>
								</DropdownMenu.Item>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.dropdown-menu__content {
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  max-height: 24rem;
  padding: 0.25rem;
  overflow-y: auto;
  background-color: var(--color-control-background-active);
  border: 1px solid var(--color-button-border-base);
  border-radius: 2px;
  box-shadow: 0 10px 30px 0 rgba(38, 128, 134, 0.06);
}
.dropdown-menu__no-options {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: var(--color-text-primary);
  text-align: center;
}</style>
