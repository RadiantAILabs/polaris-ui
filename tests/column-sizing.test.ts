import { expect, it } from 'vitest';
import { sizeColumns, resizePair } from '../src/lib/components/datatable/column-sizing';

const columns = [
	{ name: 'a', width: 100 },
	{ name: 'b', width: 200 }
];
it('shares spare width proportionally among columns', () => {
	expect(sizeColumns(columns, {}, 600), 'preferred widths weight the allocation').toEqual({
		a: 200,
		b: 400
	});
});
it('adapts resized preferences to narrower screens before overflowing', () => {
	expect(
		sizeColumns(columns, { a: 250 }, 450),
		'preferences fit without a viewport adjustment'
	).toEqual({ a: 250, b: 200 });
	expect(sizeColumns(columns, { a: 250 }, 225), 'all columns shrink proportionally').toEqual({
		a: 125,
		b: 100
	});
});
it('redistributes space when a column reaches its maximum', () => {
	expect(
		sizeColumns([{ ...columns[0]!, maxWidth: 150 }, columns[1]!], {}, 600),
		'remaining space goes to eligible columns'
	).toEqual({ a: 150, b: 450 });
});
it('overflows only after columns reach their minimums', () => {
	expect(
		sizeColumns(
			[
				{ name: 'a', minWidth: 120 },
				{ name: 'b', minWidth: 80 }
			],
			{},
			150
		),
		'minimum widths remain readable'
	).toEqual({ a: 120, b: 80 });
});
it('shares spare width even when all columns have saved preferences', () => {
	expect(
		sizeColumns(columns, { a: 120, b: 240 }, 720),
		'saved widths are preferences rather than fixed screen sizes'
	).toEqual({ a: 240, b: 480 });
	expect(sizeColumns([], {}, 800), 'empty tables have no column sizes').toEqual({});
});
it('resizing transfers space only between adjacent columns', () => {
	expect(
		resizePair(columns[0]!, columns[1]!, { a: 200, b: 400, c: 100 }, 30),
		'the pair preserves its combined width'
	).toEqual({ a: 230, b: 370 });
});
it('resizing stops when either adjacent column reaches its bounds', () => {
	expect(
		resizePair({ name: 'a', maxWidth: 250 }, { name: 'b', minWidth: 100 }, { a: 200, b: 120 }, 80),
		'the neighbour cannot shrink below its minimum'
	).toEqual({ a: 220, b: 100 });
	expect(
		resizePair({ name: 'a', maxWidth: 210 }, { name: 'b', minWidth: 100 }, { a: 200, b: 120 }, 80),
		'the chosen column cannot exceed its maximum'
	).toEqual({ a: 210, b: 110 });
});

it('uses preferred widths before the viewport is measured', () => {
	expect(sizeColumns(columns, {}), 'SSR and initial rendering use preferred sizes').toEqual({
		a: 100,
		b: 200
	});
});

it('normalizes fractional adjacent widths together without losing their total', () => {
	expect(
		resizePair(columns[0]!, columns[1]!, { a: 100.5, b: 200.5 }, 0),
		'pixel normalization preserves the pair total'
	).toEqual({ a: 101, b: 200 });
});
