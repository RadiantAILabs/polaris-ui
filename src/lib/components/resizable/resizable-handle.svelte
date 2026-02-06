<script lang="ts">
	import * as ResizablePrimitive from 'paneforge';
	import { cn } from '../../utils';
	import type { WithoutChildrenOrChild } from 'bits-ui';
	import { onMount } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		disabled = false,
		...restProps
	}: WithoutChildrenOrChild<ResizablePrimitive.PaneResizerProps> & {
		disabled?: boolean;
	} = $props();

	// Track dragging state
	let isDragging = $state(false);

	// Track if adjacent pane is collapsed
	let isAdjacentPaneCollapsed = $state(false);

	// Only actually disable when not dragging
	const effectivelyDisabled = $derived(disabled && !isDragging);

	// Should hide the resizer if adjacent pane is collapsed and not dragging
	const shouldHide = $derived(isAdjacentPaneCollapsed && !isDragging);

	onMount(() => {
		if (!ref) return;

		// Check for collapsed adjacent panes
		const checkCollapsedState = () => {
			const paneResizer = ref as HTMLElement;
			const prevPane = paneResizer.previousElementSibling;
			const nextPane = paneResizer.nextElementSibling;

			// Check if either adjacent pane is fully collapsed (not collapsing)
			// Only hide when data-pane-state is exactly "collapsed"
			const isPaneFullyCollapsed = (pane: Element | null) => {
				if (!pane) return false;
				const paneState = pane.getAttribute('data-pane-state');
				return paneState === 'collapsed';
			};

			isAdjacentPaneCollapsed = isPaneFullyCollapsed(prevPane) || isPaneFullyCollapsed(nextPane);
		};

		// Initial check
		checkCollapsedState();

		// Create a MutationObserver to watch for changes in collapse-related attributes
		const observer = new MutationObserver(() => {
			checkCollapsedState();
		});

		// Observe the parent element for changes to child attributes
		const parent = ref.parentElement;
		if (parent) {
			observer.observe(parent, {
				attributes: true,
				attributeFilter: ['data-pane-state'],
				subtree: true
			});
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<ResizablePrimitive.PaneResizer
	bind:ref
	data-slot="resizable-handle"
	class={cn(
		'resizable-handle',
		effectivelyDisabled && 'resizable-handle--disabled',
		shouldHide && 'resizable-handle--hidden',
		className
	)}
	disabled={effectivelyDisabled}
	tabindex={effectivelyDisabled ? -1 : 0}
	onDraggingChange={(dragging) => (isDragging = dragging)}
	{...restProps}
></ResizablePrimitive.PaneResizer>
