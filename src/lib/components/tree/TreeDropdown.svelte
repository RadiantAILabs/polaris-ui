<script lang="ts">
	import { Icon } from '../icon';
	import { cn } from '../../utils';

	export interface TreeDropdownProps {
		/** Whether the dropdown is open, bindable with bind:open */
		open?: boolean;
		/** Callback fired when clicked */
		onclick?: (open: boolean) => void;
		/** Accessible label for the button */
		ariaLabel?: string;
		/** Additional CSS class */
		class?: string;
		/** Whether the dropdown is disabled */
		disabled?: boolean;
	}

	let {
		open = $bindable(false),
		onclick,
		ariaLabel = 'Toggle section',
		class: className,
		disabled = false
	}: TreeDropdownProps = $props();

	function handleClick(event: MouseEvent) {
		event.stopPropagation();
		open = !open;
		onclick?.(open);
	}
</script>

{#if disabled}
	<div class="tree-dropdown--disabled" aria-hidden="true"></div>
{:else}
	<button
		class={cn('tree-dropdown', className)}
		onclick={handleClick}
		aria-label={ariaLabel}
		aria-expanded={open}
		type="button"
		tabindex="-1"
	>
		<div class="tree-dropdown__hover-area">
			<div class="tree-dropdown__icon" class:tree-dropdown__icon--open={open}>
				<Icon name="triangle-right" variant="tertiary" size="0.75rem" />
			</div>
		</div>
	</button>
{/if}

<style lang="scss">
	@use '../../styles/tokens' as *;

	.tree-dropdown {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: $space-3;
		height: $space-4;
		padding: 0 $space-1;
		margin: 0;
		cursor: pointer;
		background: transparent;
		border: none;

		&--disabled {
			width: $space-3;
			height: $space-4;
		}

		&__hover-area {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: $space-0-25;
			background: transparent;
			border-radius: $border-radius-base;

			@include transition-interactive(background-color);

			.tree-dropdown:hover &,
			.tree-dropdown:focus-visible & {
				background-color: var(--color-badge-delete-button-background-hover);
			}
		}

		&__icon {
			display: inline-flex;

			// Open state - rotates the chevron down
			&--open {
				transform: rotate(90deg);
			}
		}
	}
</style>
