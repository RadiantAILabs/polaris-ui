import { expect, userEvent, within, waitFor, fn } from 'storybook/test';
import { tick } from 'svelte';
export const widthChanges = fn().mockName('onColumnWidthsChange');
export const sortChanges = fn().mockName('onSortChange');

export async function rowActions({ canvasElement }: { canvasElement: HTMLElement }) {
	const canvas = within(canvasElement);
	const document = within(canvasElement.ownerDocument.body);
	const trigger = canvas.getAllByRole('button', { name: 'Row actions' })[0];
	if (!(trigger instanceof HTMLElement)) throw new Error('Row actions require a trigger');
	const cell = trigger.closest('td');
	if (!cell) throw new Error('Row actions require a table cell');
	await expect(
		getComputedStyle(cell).paddingInlineStart,
		'action cells keep space around the trigger at base density'
	).toBe('12px');
	const before = canvas.queryByRole('status')?.textContent;
	await userEvent.click(trigger);
	await expect(
		canvas.queryByRole('status')?.textContent,
		'opening row actions does not select the row'
	).toBe(before);
	await expect(await document.findByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
		'aria-disabled',
		'true'
	);
	await userEvent.click(document.getByRole('menuitem', { name: 'Edit' }));
	await expect(canvas.getByRole('status')).toHaveTextContent('edit car 1');
	trigger.focus();
	await userEvent.keyboard('{Enter}');
	await document.findByRole('menuitem', { name: 'Edit' });
	await expect(canvas.getByRole('status')).toHaveTextContent('edit car 1');
	await userEvent.keyboard('{Escape}');
}

export async function resizeColumns({ canvasElement }: { canvasElement: HTMLElement }) {
	const canvas = within(canvasElement);
	widthChanges.mockClear();
	await canvasElement.ownerDocument.fonts.ready;
	const width = (name: string) =>
		canvas.getByRole('columnheader', { name }).getBoundingClientRect().width;
	const expectWidth = (actual: number, expected: number, reason: string) =>
		expect(Math.abs(actual - expected), reason).toBeLessThan(1);
	const initial = ['ID', 'Manufacturer', 'Model', 'Year'].map(width);
	canvas.getByRole('separator', { name: 'Resize Manufacturer' }).focus();
	await userEvent.keyboard('{ArrowRight}');
	await waitFor(() => {
		expectWidth(width('Manufacturer'), initial[1]! + 10, 'dragged column gains space');
		expectWidth(width('Model'), initial[2]! - 10, 'adjacent column gives up the same space');
		expectWidth(width('ID'), initial[0]!, 'earlier columns stay fixed');
		expectWidth(width('Year'), initial[3]!, 'later columns stay fixed');
	});
	const handle = canvas.getByRole('separator', { name: 'Resize Model' });
	const start = width('Model'),
		adjacent = width('Year');
	const mouse = (type: string, clientX: number) =>
		(type === 'mousedown' ? handle : canvasElement.ownerDocument).dispatchEvent(
			new MouseEvent(type, { bubbles: true, button: 0, clientX })
		);
	mouse('mousedown', 100);
	mouse('mousemove', 110);
	await waitFor(() =>
		expectWidth(width('Model'), start + 10, 'mouse resizing follows the divider')
	);
	await expectWidth(
		width('Year'),
		adjacent - 10,
		'mouse resizing transfers space from its neighbour'
	);
	mouse('mousemove', 100);
	mouse('mouseup', 100);
	await tick();
	await expect(widthChanges, 'returning to the start does not save').toHaveBeenCalledTimes(1);
	mouse('mousedown', 100);
	mouse('mousemove', 110);
	await waitFor(() => expect(width('Model')).toBeCloseTo(start + 10, 0));
	mouse('mouseup', 110);
	await tick();
	await expect(widthChanges, 'one completed drag saves the layout once').toHaveBeenCalledTimes(2);
	handle.focus();
	for (let i = 0; i < 10; i++) await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
	const before = widthChanges.mock.calls.length;
	await userEvent.keyboard('{ArrowRight}');
	await expect(
		widthChanges.mock.calls.length,
		'the adjacent minimum stops resizing without extra saves'
	).toBe(before);
	await expect(handle.getAttribute('aria-valuenow'), 'the divider stops at the pair limit').toBe(
		handle.getAttribute('aria-valuemax')
	);
}

export async function scrollPageAndTable({ canvasElement }: { canvasElement: HTMLElement }) {
	const canvas = within(canvasElement);
	widthChanges.mockClear();
	const outer = canvasElement.querySelector<HTMLElement>('.page-scroll');
	const header = canvasElement.querySelector<HTMLElement>('.data-table__page-header');
	const bodyViewport = canvasElement.querySelector<HTMLElement>(
		'.data-table > .table > .table__viewport'
	);
	const headerViewport = header?.querySelector<HTMLElement>('.table__viewport');
	if (!outer || !header || !bodyViewport || !headerViewport)
		throw new Error('Page scrolling requires its outer viewport and both table viewports');
	await canvasElement.ownerDocument.fonts.ready;
	await waitFor(() => expect(canvasElement.querySelector('colgroup')).not.toBeNull());
	const table = canvasElement.querySelector<HTMLElement>('.data-table');
	if (!table) throw new Error('Page scrolling requires its table wrapper');
	await expect(getComputedStyle(table).display).toBe('block');
	await expect(getComputedStyle(headerViewport).overflowX).toBe('hidden');
	await expect(getComputedStyle(headerViewport).overflowY).toBe('hidden');
	const top = header.getBoundingClientRect().top;
	for (const y of [1, 250, 0]) {
		outer.scrollTop = y;
		await waitFor(() => expect(header.getBoundingClientRect().top).toBeCloseTo(top, 0));
	}
	const sizes = () =>
		Array.from(header.querySelectorAll('th'), (cell) => cell.getBoundingClientRect().width);
	const initial = sizes();
	await expect(
		canvas.queryByRole('group', { name: 'Scroll table horizontally' }),
		'a fitting table has no empty scrollbar'
	).not.toBeInTheDocument();
	const handle = canvas.getByRole('separator', { name: 'Resize Manufacturer' });
	const mouse = (type: string, clientX: number) =>
		(type === 'mousedown' ? handle : canvasElement.ownerDocument).dispatchEvent(
			new MouseEvent(type, { bubbles: true, button: 0, clientX })
		);
	mouse('mousedown', 100);
	mouse('mousemove', 140);
	await waitFor(() =>
		expect(
			Math.abs(sizes()[1]! - initial[1]! - 40),
			'resizing follows the requested width within pixel rounding'
		).toBeLessThan(1)
	);
	canvas.getByRole('button', { name: 'Refresh widths' }).click();
	await tick();
	await expect(
		Math.abs(sizes()[1]! - initial[1]! - 40),
		'parent refresh does not discard an active drag'
	).toBeLessThan(1);
	mouse('mouseup', 140);
	await waitFor(() =>
		expect(Object.keys(widthChanges.mock.lastCall?.[0] ?? {})).toEqual([
			'id',
			'manufacturer',
			'model',
			'year'
		])
	);
	await expect(bodyViewport.scrollWidth, 'columns still fit after one resize').toBeLessThanOrEqual(
		bodyViewport.clientWidth + 1
	);
	await expect(
		Math.abs(sizes()[0]! - initial[0]!),
		'resizing leaves earlier columns unchanged'
	).toBeLessThan(1);
	await expect(
		Math.abs(sizes()[3]! - initial[3]!),
		'resizing leaves later columns unchanged'
	).toBeLessThan(1);
	await expect(
		Math.abs(sizes()[2]! - initial[2]! + 40),
		'adjacent column gives up the requested width'
	).toBeLessThan(1);
	const preferredWidth = sizes()[1]!;
	outer.style.width = '640px';
	await waitFor(() => {
		expect(sizes()[1]!, 'resized preferences shrink with the viewport').toBeLessThan(
			preferredWidth
		);
		expect(sizes()[0]!, 'columns shrink with the container').toBeLessThan(initial[0]!);
	});
	outer.style.width = '';
	await waitFor(() => expect(Math.abs(sizes()[0]! - initial[0]!)).toBeLessThan(1));
	outer.style.width = '240px';
	await waitFor(() => expect(bodyViewport.scrollWidth).toBeGreaterThan(bodyViewport.clientWidth));
	await waitFor(() => expect(sizes().slice(0, 4)).toEqual([100, 100, 100, 100]));
	const saves = widthChanges.mock.calls.length;
	handle.focus();
	await userEvent.keyboard('{ArrowRight}');
	await waitFor(() => expect(sizes().slice(0, 4)).toEqual([100, 110, 100, 100]));
	await expect(handle).toHaveAttribute('aria-valuemax', '1600');
	mouse('mousedown', 100);
	mouse('mousemove', 140);
	await waitFor(() => expect(sizes().slice(0, 4)).toEqual([100, 150, 100, 100]));
	mouse('mouseup', 140);
	await tick();
	await expect(sizes().slice(0, 4), 'overflow growth persists after releasing the divider').toEqual(
		[100, 150, 100, 100]
	);
	await expect(widthChanges).toHaveBeenCalledTimes(saves + 2);
	const scrollbar = await canvas.findByRole('group', { name: 'Scroll table horizontally' });
	outer.scrollTop = 0;
	await waitFor(() =>
		expect(
			scrollbar.getBoundingClientRect().bottom,
			'horizontal scrollbar is reachable before scrolling to the final row'
		).toBeLessThanOrEqual(outer.getBoundingClientRect().bottom + 1)
	);
	scrollbar.scrollLeft = 150;
	await waitFor(() =>
		expect(bodyViewport.scrollLeft, 'the visible scrollbar moves the table').toBe(150)
	);
	bodyViewport.scrollLeft = 300;
	await waitFor(() => expect(headerViewport.scrollLeft).toBe(bodyViewport.scrollLeft));
	await expect(outer.scrollLeft).toBe(0);
	bodyViewport.scrollLeft = 0;
	await waitFor(() => expect(headerViewport.scrollLeft).toBe(0));
	within(header).getByRole('button', { name: 'Sort Year ascending' }).focus();
	await waitFor(() => expect(bodyViewport.scrollLeft).toBeGreaterThan(0));
	await waitFor(() => expect(headerViewport.scrollLeft).toBe(bodyViewport.scrollLeft));
	const beforeWheel = bodyViewport.scrollLeft;
	headerViewport.dispatchEvent(
		new WheelEvent('wheel', { deltaX: -100, bubbles: true, cancelable: true })
	);
	await waitFor(() => expect(bodyViewport.scrollLeft).toBe(Math.max(0, beforeWheel - 100)));
	await waitFor(() => expect(headerViewport.scrollLeft).toBe(bodyViewport.scrollLeft));
	outer.scrollTop = outer.scrollHeight;
	await waitFor(() =>
		expect(header.getBoundingClientRect().bottom).toBeLessThanOrEqual(
			table.getBoundingClientRect().bottom + 1
		)
	);
	await expect(outer.scrollLeft).toBe(0);
	outer.scrollTop = 0;
	outer.style.width = '';
}

export async function wrapping({ canvasElement }: { canvasElement: HTMLElement }) {
	await canvasElement.ownerDocument.fonts.ready;
	await fitsViewport({ canvasElement });
	const canvas = within(canvasElement);
	const cell = canvas.getByRole('cell', { name: /Searches indexed documents/ });
	await expect(cell.getBoundingClientRect().height).toBeGreaterThan(60);
	for (const name of ['Jane Smith', 'Oct 21, 2026']) {
		const content = canvas.getByRole('cell', { name }).querySelector('div');
		if (!content) throw new Error('A wrapping cell needs its content');
		await expect(content.getBoundingClientRect().height).toBeLessThanOrEqual(
			parseFloat(getComputedStyle(content).lineHeight) + 1
		);
	}
}
export async function fitsViewport({ canvasElement }: { canvasElement: HTMLElement }) {
	await waitFor(() => {
		for (const viewport of canvasElement.querySelectorAll<HTMLElement>('.table__viewport'))
			expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth + 1);
	});
}

export async function localSorting({ canvasElement }: { canvasElement: HTMLElement }) {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole('button', { name: 'Sort ID ascending' }));
	await userEvent.click(canvas.getByRole('button', { name: 'Sort ID descending' }));
	await waitFor(() =>
		expect(
			canvas
				.getAllByRole('row')
				.slice(1)
				.map((row) => row.querySelector('td')?.textContent?.trim())
		).toEqual(['4', '3', '2', '1'])
	);
}
export async function manualSorting({ canvasElement }: { canvasElement: HTMLElement }) {
	const canvas = within(canvasElement);
	sortChanges.mockClear();
	const rowOrder = () =>
		canvas
			.getAllByRole('row')
			.slice(1)
			.map((row) => row.textContent);
	const before = rowOrder();
	await fitsViewport({ canvasElement });
	await userEvent.click(canvas.getByRole('button', { name: 'Sort Year ascending' }));
	await expect(sortChanges).toHaveBeenLastCalledWith({ column: 'year', direction: 'asc' });
	await expect(rowOrder()).toEqual(before);
}

export async function scrollContainer({ canvasElement }: { canvasElement: HTMLElement }) {
	const viewport = canvasElement.querySelector<HTMLElement>('.table__viewport');
	const header = canvasElement.querySelector<HTMLElement>('th');
	if (!viewport || !header)
		throw new Error('Container scrolling requires a table viewport and header');
	await canvasElement.ownerDocument.fonts.ready;
	await waitFor(() => {
		expect(viewport.clientHeight).toBeLessThanOrEqual(320);
		expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
	});
	const top = header.getBoundingClientRect().top;
	viewport.scrollTop = 200;
	await waitFor(() => {
		expect(viewport.scrollTop).toBe(200);
		expect(header.getBoundingClientRect().top).toBeCloseTo(top, 0);
	});
}
