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

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.tree-dropdown {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 2rem;
  padding: 0 0.5rem;
  margin: 0;
  cursor: pointer;
  background: transparent;
  border: none;
}
.tree-dropdown--disabled {
  width: 1.5rem;
  height: 2rem;
}
.tree-dropdown__hover-area {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  background: transparent;
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .tree-dropdown__hover-area {
    transition: background-color 150ms ease-in-out;
  }
}
.tree-dropdown:hover .tree-dropdown__hover-area, .tree-dropdown:focus-visible .tree-dropdown__hover-area {
  background-color: var(--color-badge-delete-button-background-hover);
}
.tree-dropdown__icon {
  display: inline-flex;
}
.tree-dropdown__icon--open {
  transform: rotate(90deg);
}</style>
