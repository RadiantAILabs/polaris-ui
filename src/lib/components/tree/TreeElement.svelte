<script lang="ts">
	import { cn } from '../../utils';
	import TreeTrail from './TreeTrail.svelte';
	import TreeResourceIcon, { type TreeElementType } from './TreeResourceIcon.svelte';
	import TreeElementDetails, { type TreeElementDetailsProps } from './TreeElementDetails.svelte';
	import TreeDropdown from './TreeDropdown.svelte';
	import { Badge } from '../badge';

	/**
	 * Props for a TreeElement component.
	 *
	 * @important TreeElement must be used within a container with `role="tree"` for proper accessibility.
	 * @example
	 * ```svelte
	 * <div role="tree" aria-label="File tree">
	 *   <Tree.Element type="agent" label="Root" indentLevel={0} />
	 *   <Tree.Element type="nli" label="Child" indentLevel={1} />
	 * </div>
	 * ```
	 */
	export interface TreeElementProps {
		/** Whether the tree element is expanded */
		expanded?: boolean;
		/** Callback fired when expand state changes */
		onExpandChange?: (expanded: boolean) => void;
		/** Whether the element is selected */
		selected?: boolean;
		/** Callback fired when selection state changes */
		onSelectionChange?: (selected: boolean) => void;
		/** Type of resource */
		type: TreeElementType;
		/** Label text for the tree element */
		label: string;
		/** Optional details to display */
		details?: Omit<TreeElementDetailsProps, 'class'>;
		/** Indentation level. Must be 0 or greater */
		indentLevel?: number;
		/** Whether to show a vertical line connecting to the previous sibling */
		upConnector?: boolean;
		/** Whether to show a vertical line connecting to the next sibling or expanded children */
		downConnector?: boolean;
		/** Whether to show a horizontal branch line connecting parent to this child */
		inwardTrail?: boolean;
		/** Optional badge count to display after the icon */
		badgeCount?: number;
		/** Whether the element can be expanded */
		canExpand?: boolean;
		/** Array of booleans indicating which indent levels should show vertical lines.
		 * Array is indexed left to right (indentLines[0] is leftmost, indentLines[n-1] is rightmost).
		 * indentLines.length should equal indentLevel.
		 * For example, [true, false, true] means show line at levels 0 and 2, but not at level 1. */
		indentLines?: boolean[];
		/** Additional CSS class */
		class?: string;
		/** Tab index for focus management (0 = tabbable, -1 = not in tab order) */
		tabIndex?: number;
		/** Keyboard event handler */
		onkeydown?: (event: KeyboardEvent) => void;
		/** Focus event handler */
		onfocus?: (event: FocusEvent) => void;
	}

	let {
		expanded = $bindable(false),
		onExpandChange,
		selected = $bindable(false),
		onSelectionChange,
		type,
		label,
		details,
		indentLevel = 0,
		upConnector = false,
		downConnector = false,
		inwardTrail = false,
		badgeCount,
		canExpand = false,
		indentLines = [],
		class: className,
		tabIndex = -1,
		onkeydown: onKeyDown,
		onfocus: onFocus
	}: TreeElementProps = $props();

	let elementRef: HTMLDivElement;

	function handleClick() {
		// Select the element on click
		selected = true;
		onSelectionChange?.(selected);
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Call parent handler
		onKeyDown?.(event);

		// Then handle expand/collapse
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			// Select the element
			selected = true;
			onSelectionChange?.(selected);
		} else if (event.key === 'ArrowRight' && canExpand) {
			event.preventDefault();

			// Expand the element
			if (!expanded) {
				expanded = true;
				onExpandChange?.(expanded);
			}
		} else if (event.key === 'ArrowLeft' && canExpand) {
			event.preventDefault();

			// Collapse the element
			if (expanded) {
				expanded = false;
				onExpandChange?.(expanded);
			}
		}
	}

	function handleDropdownClick(open: boolean) {
		expanded = open;
		onExpandChange?.(expanded);
	}
</script>

<div
	bind:this={elementRef}
	class={cn('tree-element', className)}
	class:tree-element--selected={selected}
	role="treeitem"
	data-type="tree-element"
	aria-expanded={canExpand ? expanded : undefined}
	aria-selected={selected}
	aria-level={indentLevel + 1}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	onfocus={onFocus}
	tabindex={tabIndex}
>
	<!-- Expand/collapse dropdown -->
	<TreeDropdown
		bind:open={expanded}
		onclick={handleDropdownClick}
		disabled={!canExpand}
		ariaLabel={expanded ? `Collapse ${label}` : `Expand ${label}`}
	/>

	<!-- Indent trails -->
	<!--
		Render indent trails for levels 0 through indentLevel-2.
		We use (indentLevel - 1) because:
		- Level 0 elements have indentLevel=0, so no trails are rendered
		- Level 1 elements have indentLevel=1, so 0 trails (the inward trail
		  zone below adds the required indentation)
		- Level 2+ elements render trails for all ancestor levels except the immediate parent
	-->
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each Array(Math.max(0, indentLevel - 1)) as _, i (i)}
		<TreeTrail down={indentLines[i] ?? false} outward={false} inward={false} />
	{/each}

	<!-- Trail zone before icon -->
	{#if indentLevel > 0}
		<TreeTrail down={indentLines[indentLevel - 1] ?? false} outward={false} inward={inwardTrail} />
	{/if}

	<div class="tree-element__content">
		<!-- Icon -->
		<TreeResourceIcon {type} {upConnector} {downConnector} />

		<!-- Content -->
		<span class="tree-element__label" title={label}>{label}</span>

		{#if badgeCount !== undefined}
			<Badge text={String(badgeCount)} />
		{/if}
	</div>

	{#if details}
		<div class="tree-element__details">
			<TreeElementDetails {...details} />
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.tree-element {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		width: 100%;
		height: 32px;
		padding-right: $space-1;
		cursor: pointer;
		outline: none;
		background-color: transparent;
		border-radius: $border-radius-base;

		&:hover {
			background-color: var(--color-control-background-hover);
		}

		&:focus-visible {
			outline: 2px solid var(--color-control-border-active);
			outline-offset: -2px;
		}

		&--selected {
			background-color: var(--color-control-background-active);

			&:hover {
				background-color: var(--color-control-background-active);
			}
		}

		// -- Content area --
		&__content {
			display: flex;
			flex: 1;
			gap: $space-1;
			align-items: center;
			min-width: 0;
		}

		// -- Label text --
		&__label {
			flex: 1;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			color: var(--color-text-primary);
			white-space: nowrap;

			@include typography('body-base-regular');
		}

		// -- Details area --
		&__details {
			margin-left: $space-2;
		}
	}
</style>
