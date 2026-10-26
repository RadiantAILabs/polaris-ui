import type { ColumnSizingState } from '@tanstack/svelte-table';

export interface ColumnDimensions {
	/** Preferred width in pixels; also weights the share of spare space. Defaults to 160. */
	width?: number;
	/** Minimum width in pixels. Defaults to 48. */
	minWidth?: number;
	/** Maximum width in pixels. Defaults to 1600. */
	maxWidth?: number;
}
export const MIN_COLUMN_WIDTH = 48;
export const MAX_COLUMN_WIDTH = 1600;
export const DEFAULT_COLUMN_WIDTH = 160;

export function clampWidth(column: ColumnDimensions, width: number): number {
	return Math.min(
		column.maxWidth ?? MAX_COLUMN_WIDTH,
		Math.max(column.minWidth ?? MIN_COLUMN_WIDTH, Math.round(width))
	);
}

/** Preferred widths share the viewport within column bounds. */
export function sizeColumns(
	columns: readonly (ColumnDimensions & { name: PropertyKey })[],
	preferredWidths: ColumnSizingState,
	available?: number
): ColumnSizingState {
	const sizes: ColumnSizingState = {};
	const entries = [];
	for (const column of columns) {
		const id = String(column.name);
		const preferred = clampWidth(
			column,
			preferredWidths[id] ?? column.width ?? DEFAULT_COLUMN_WIDTH
		);
		sizes[id] = preferred;
		entries.push({ id, column, weight: preferred });
	}
	let remaining =
		available === undefined
			? 0
			: available - Object.values(sizes).reduce((sum, width) => sum + width, 0);
	let eligible = entries;
	while (Math.abs(remaining) > 0.01 && eligible.length) {
		eligible = eligible.filter(({ id, column }) =>
			remaining > 0
				? sizes[id]! < (column.maxWidth ?? MAX_COLUMN_WIDTH)
				: sizes[id]! > (column.minWidth ?? MIN_COLUMN_WIDTH)
		);
		const weight = eligible.reduce((sum, column) => sum + column.weight, 0);
		if (!weight) break;
		let allocated = 0;
		for (const { id, column, weight: share } of eligible) {
			const before = sizes[id]!;
			sizes[id] = Math.min(
				column.maxWidth ?? MAX_COLUMN_WIDTH,
				Math.max(column.minWidth ?? MIN_COLUMN_WIDTH, before + (remaining * share) / weight)
			);
			allocated += sizes[id]! - before;
		}
		remaining -= allocated;
	}
	return sizes;
}

/** Trade width between neighbours, or resize independently in an overflowing page table. */
export function resizePair(
	column: ColumnDimensions & { name: PropertyKey },
	adjacent: ColumnDimensions & { name: PropertyKey },
	sizes: ColumnSizingState,
	delta: number,
	overflow = false
): ColumnSizingState {
	const id = String(column.name),
		nextId = String(adjacent.name);
	const width = sizes[id]!;
	if (overflow) return { [id]: clampWidth(column, width + delta) };
	const total = Math.round(width + sizes[nextId]!);
	const nextWidth = clampWidth(pairBounds(column, adjacent, total), width + delta);
	return { [id]: nextWidth, [nextId]: total - nextWidth };
}

/** Divider range constrained by both columns, in pixels. */
export function pairBounds(column: ColumnDimensions, adjacent: ColumnDimensions, total: number) {
	return {
		minWidth: Math.max(
			column.minWidth ?? MIN_COLUMN_WIDTH,
			total - (adjacent.maxWidth ?? MAX_COLUMN_WIDTH)
		),
		maxWidth: Math.min(
			column.maxWidth ?? MAX_COLUMN_WIDTH,
			total - (adjacent.minWidth ?? MIN_COLUMN_WIDTH)
		)
	};
}
