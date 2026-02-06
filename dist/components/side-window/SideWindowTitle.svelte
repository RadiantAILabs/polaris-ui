<script lang="ts" module>
	import type { IconAndTextProps } from '../icon-and-text';
	import type { Snippet } from 'svelte';

	export interface SideWindowTitleProps {
		title: string;
		iconAndText1?: Omit<IconAndTextProps, 'size'>;
		iconAndText2?: Omit<IconAndTextProps, 'size'>;
		showExpand?: boolean;
		showClose?: boolean;
		onExpand?: () => void;
		onClose?: () => void;
		titleActions?: Snippet;
	}
</script>

<script lang="ts">
	import { IconAndText } from '../icon-and-text';
	import { Button } from '../button';

	let {
		title,
		iconAndText1,
		iconAndText2,
		showExpand = false,
		showClose = true,
		onExpand,
		onClose,
		titleActions
	}: SideWindowTitleProps = $props();
	// Whether to show the compact layout (info below title)
	let isCompact = $state(false);

	// Filter out undefined iconAndText and ensure we only render defined ones
	const iconAndTexts = $derived([iconAndText1, iconAndText2].filter(Boolean) as IconAndTextProps[]);
	const hasWindowManagement = $derived(showExpand || showClose);
	const hasInfo = $derived(iconAndTexts.length > 0 || titleActions);
	const showDivider = $derived(hasInfo && hasWindowManagement && !isCompact);

	// Refs for overflow detection
	let rowElement: HTMLElement | undefined = $state(undefined);
	let titleElement: HTMLElement | undefined = $state(undefined);
	let infoElement: HTMLElement | undefined = $state(undefined);
	let managementElement: HTMLElement | undefined = $state(undefined);

	function checkOverflow() {
		if (!rowElement || !titleElement || !infoElement) return;

		const availableWidth = rowElement.clientWidth;

		// Read spacing values from CSS custom properties
		const computedStyle = getComputedStyle(rowElement);
		const gapValue = parseFloat(computedStyle.getPropertyValue('--gap'));
		const dividerWidthValue = parseFloat(computedStyle.getPropertyValue('--divider-width'));

		// Fallback values with dev-time validation
		const gap = gapValue || 16;

		// Determine if divider will be shown (divider only required if both an
		// info and window management section exist on the same row)
		const wouldShowDivider = hasInfo && hasWindowManagement;
		const dividerWidth = wouldShowDivider ? dividerWidthValue || 1 : 0;

		if (import.meta.env.DEV) {
			if (isNaN(gapValue)) {
				throw new Error('CSS variable --gap not properly defined in SideWindowTitle');
			}
			if (wouldShowDivider && isNaN(dividerWidthValue)) {
				throw new Error('CSS variable --divider-width not properly defined in SideWindowTitle');
			}
		}

		const titleWidth = titleElement.scrollWidth;
		const infoWidth = infoElement?.scrollWidth || 0;
		const managementWidth = managementElement?.scrollWidth || 0;

		// Calculate gaps based on the layout structure:
		// title <--gap--> controls [info <--gap--> divider <--gap--> management]
		let totalGap = 0;

		// Gap between title and controls container (title <--gap--> control)
		totalGap += gap;

		// Gaps within controls container ([info <--gap--> divider <--gap--> management])
		if (managementElement) {
			if (wouldShowDivider) {
				// info <--gap--> divider <--gap--> management
				totalGap += gap * 2 + dividerWidth;
			} else {
				// info <--gap--> management
				totalGap += gap;
			}
		}

		const totalNeeded = titleWidth + infoWidth + managementWidth + totalGap;

		isCompact = totalNeeded > availableWidth;
	}
	// Watch for resize changes
	$effect(() => {
		if (!rowElement) return;

		let rafId: number | undefined;

		const resizeObserver = new ResizeObserver(() => {
			// Debounce overflow checks using RAF to avoid excessive recalculations
			if (rafId !== undefined) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				checkOverflow();
				rafId = undefined;
			});
		});

		resizeObserver.observe(rowElement);

		// Initial check
		checkOverflow();

		return () => {
			resizeObserver.disconnect();
			if (rafId !== undefined) cancelAnimationFrame(rafId);
		};
	});

	// Recheck overflow when content changes
	$effect(() => {
		// Watch these dependencies
		void title;
		void iconAndTexts.length;

		// Queue check for next frame to ensure DOM has updated
		requestAnimationFrame(checkOverflow);
	});
</script>

{#snippet infoSection()}
	{#if iconAndTexts.length > 0 || titleActions}
		<div
			class="side-window-title-bar__info"
			class:has-divider={showDivider}
			bind:this={infoElement}
		>
			{@render titleActions?.()}
			{#each iconAndTexts as iconAndTextProps, i (i)}
				<IconAndText {...iconAndTextProps} size="large" />
			{/each}
		</div>
	{/if}
{/snippet}

<header class="side-window-title-bar" class:is-compact={isCompact}>
	<div class="side-window-title-bar__row" bind:this={rowElement}>
		<h3 class="side-window-title-bar__title" bind:this={titleElement}>{title}</h3>

		<div class="side-window-title-bar__controls">
			{#if !isCompact}
				{@render infoSection()}
			{/if}

			{#if showDivider}
				<div class="side-window-title-bar__divider"></div>
			{/if}

			{#if hasWindowManagement}
				<div class="side-window-title-bar__window-management" bind:this={managementElement}>
					{#if showExpand}
						<Button
							variant="invisible"
							icon="expand"
							onclick={onExpand}
							size="small"
							aria-label="Expand"
						/>
					{/if}
					{#if showClose}
						<Button
							variant="invisible"
							icon="cross"
							onclick={onClose}
							size="small"
							aria-label="Close"
						/>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if isCompact}
		{@render infoSection()}
	{/if}
</header>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.side-window-title-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* Spacing in between elements on the row */
  --gap: 16px;
  /* Width of the vertical divider line between info and window management */
  --divider-width: 1px;
}

.side-window-title-bar__row {
  display: flex;
  gap: var(--gap);
  align-items: center;
  justify-content: space-between;
}

.side-window-title-bar__controls {
  display: flex;
  gap: var(--gap);
  align-items: center;
}

.side-window-title-bar__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  white-space: nowrap;
}

.side-window-title-bar__info {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: fit-content;
}

.side-window-title-bar__divider {
  align-self: stretch;
  width: var(--divider-width);
  background-color: var(--color-border-base);
}

.side-window-title-bar__window-management {
  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
  align-items: center;
}</style>
