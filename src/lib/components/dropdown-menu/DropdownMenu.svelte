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

<style lang="scss">
	@use './DropdownMenu';
</style>
