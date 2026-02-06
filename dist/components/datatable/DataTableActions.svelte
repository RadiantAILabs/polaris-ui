<script lang="ts" module>
	import type { DropdownMenuProps } from '../dropdown-menu/DropdownMenu.svelte';

	export interface DataTableActionItem {
		/** The text to display for this action */
		label: string;
		/** The value to pass to the onAction callback when selected */
		value: string;
		/** Whether this action is disabled */
		disabled?: boolean;
	}

	export interface DataTableActionsProps extends Omit<
		DropdownMenuProps,
		'items' | 'buttonLabel' | 'buttonProps' | 'onSelect'
	> {
		/** Array of action items to display in the dropdown */
		actions: DataTableActionItem[];
		/** Callback fired when an action is selected. Receives the action value */
		onAction?: (value: string) => void;
	}
</script>

<script lang="ts">
	import { DropdownMenu } from '../dropdown-menu';
	import type { ButtonProps } from '../button';

	let { actions, onAction, align = 'end', ...restProps }: DataTableActionsProps = $props();

	let open = $state(false);

	const buttonProps: ButtonProps = {
		variant: 'invisible',
		icon: 'more-vert',
		size: 'small'
	};

	const actionLabels = $derived(actions.map((action) => action.label));

	function handleSelect(label: string) {
		const action = actions.find((a) => a.label === label);
		if (action && onAction) {
			onAction(action.value);
		}
	}

	// Handle mouse events to maintain parent row hover state
	function handleMouseEnter(event: MouseEvent) {
		event.stopPropagation();
		// Find the parent table row and set hover background
		const row = (event.target as Element).closest('tr') as HTMLElement;
		if (row) {
			row.style.backgroundColor = 'var(--color-table-cell-background-hover)';
		}
	}

	function handleMouseLeave(event: MouseEvent) {
		if (!open) {
			event.stopPropagation();
			// Find the parent table row and remove hover background
			const row = (event.target as Element).closest('tr') as HTMLElement;
			if (row) {
				row.style.backgroundColor = '';
			}
		}
	}

	// Remove hover background when dropdown closes
	$effect(() => {
		if (!open) {
			// Remove hover background from any rows that might have it
			document.querySelectorAll('tr[style*="background-color"]').forEach((row) => {
				(row as HTMLElement).style.backgroundColor = '';
			});
		}
	});
</script>

<div role="button" tabindex="-1" onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave}>
	<DropdownMenu
		bind:open
		buttonLabel=""
		items={actionLabels}
		{buttonProps}
		{align}
		onSelect={handleSelect}
		{...restProps}
	/>
</div>
