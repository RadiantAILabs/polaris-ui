<script lang="ts">
	let {
		label,
		width,
		min,
		max,
		resizing = false,
		onStart,
		onResize
	}: {
		label: string;
		width: number;
		min: number;
		max: number;
		resizing?: boolean;
		onStart: (event: MouseEvent | TouchEvent) => void;
		onResize: (delta: number) => void;
	} = $props();
	function keydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		onResize((event.key === 'ArrowRight' ? 1 : -1) * (event.shiftKey ? 40 : 10));
	}
</script>

<!-- ARIA defines focusable separators as widgets; Svelte classifies separators as static. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
	tabindex="0"
	role="separator"
	aria-orientation="vertical"
	aria-valuenow={Math.round(width)}
	aria-valuetext={`${Math.round(width)} pixels`}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-label={label}
	data-resizing={resizing || undefined}
	onmousedown={onStart}
	ontouchstart={onStart}
	onkeydown={keydown}
></div>

<style>
	div {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
		width: 12px;
		touch-action: none;
		cursor: col-resize;
		user-select: none;
	}

	div::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 2px;
		content: '';
		background: transparent;
	}

	div:hover::after,
	div:focus-visible::after,
	div[data-resizing]::after {
		background: var(--color-border-strong);
	}

	div:focus-visible {
		outline: none;
	}
</style>
