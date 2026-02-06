<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Table } from './index';

	const { Story } = defineMeta({
		title: 'Components/Table',
		component: Table.Root,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs']
	});

	const rawData = [
		{ id: 1, invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350 },
		{ id: 2, invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250 },
		{ id: 3, invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: 150 }
	];

	let sortState = $state<{
		column: 'invoice' | 'status' | 'method' | 'amount' | null;
		direction: 'asc' | 'desc' | null;
	}>({
		column: null,
		direction: null
	});

	const sortedData = $derived.by(() => {
		if (!sortState.column || !sortState.direction) {
			return rawData;
		}

		return [...rawData].sort((a, b) => {
			if (!sortState.column) return 0;

			const column = sortState.column;
			let aVal = column === 'amount' ? a[column] : String(a[column]).toLowerCase();
			let bVal = column === 'amount' ? b[column] : String(b[column]).toLowerCase();

			if (aVal < bVal) return sortState.direction === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortState.direction === 'asc' ? 1 : -1;
			return 0;
		});
	});

	const handleSort =
		(column: 'invoice' | 'status' | 'method' | 'amount') => (direction: 'asc' | 'desc') => {
			sortState = { column, direction };
		};
</script>

<Story name="Basic">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Basic Table</h3>
			<Table.Root hoverable={true}>
				<Table.Header>
					<Table.HeaderCell>Invoice</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Method</Table.HeaderCell>
					<Table.HeaderCell>Amount</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					<Table.BodyRow>
						<Table.BodyCell>INV001</Table.BodyCell>
						<Table.BodyCell>Paid</Table.BodyCell>
						<Table.BodyCell>Credit Card</Table.BodyCell>
						<Table.BodyCell>$250.00</Table.BodyCell>
					</Table.BodyRow>
					<Table.BodyRow>
						<Table.BodyCell>INV002</Table.BodyCell>
						<Table.BodyCell>Pending</Table.BodyCell>
						<Table.BodyCell>PayPal</Table.BodyCell>
						<Table.BodyCell>$150.00</Table.BodyCell>
					</Table.BodyRow>
					<Table.BodyRow>
						<Table.BodyCell>INV003</Table.BodyCell>
						<Table.BodyCell>Unpaid</Table.BodyCell>
						<Table.BodyCell>Bank Transfer</Table.BodyCell>
						<Table.BodyCell>$350.00</Table.BodyCell>
					</Table.BodyRow>
				</Table.Body>
			</Table.Root>
		</div>
	{/snippet}
</Story>

<Story name="Primary Column">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Basic Table</h3>
			<Table.Root hoverable={true} primaryColumn={true}>
				<Table.Header>
					<Table.HeaderCell>Invoice</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Method</Table.HeaderCell>
					<Table.HeaderCell>Amount</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					<Table.BodyRow>
						<Table.BodyCell>INV001</Table.BodyCell>
						<Table.BodyCell>Paid</Table.BodyCell>
						<Table.BodyCell>Credit Card</Table.BodyCell>
						<Table.BodyCell>$250.00</Table.BodyCell>
					</Table.BodyRow>
					<Table.BodyRow>
						<Table.BodyCell>INV002</Table.BodyCell>
						<Table.BodyCell>Pending</Table.BodyCell>
						<Table.BodyCell>PayPal</Table.BodyCell>
						<Table.BodyCell>$150.00</Table.BodyCell>
					</Table.BodyRow>
					<Table.BodyRow>
						<Table.BodyCell>INV003</Table.BodyCell>
						<Table.BodyCell>Unpaid</Table.BodyCell>
						<Table.BodyCell>Bank Transfer</Table.BodyCell>
						<Table.BodyCell>$350.00</Table.BodyCell>
					</Table.BodyRow>
				</Table.Body>
			</Table.Root>
		</div>
	{/snippet}
</Story>

<Story name="Empty Table">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Empty Table</h3>
			<Table.Root>
				<Table.Header>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
				</Table.Header>
				<Table.Body></Table.Body>
			</Table.Root>
		</div>
	{/snippet}
</Story>

<Story name="Sortable">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Sortable Table</h3>
			<Table.Root hoverable={true}>
				<Table.Header>
					<Table.HeaderCell
						sortable
						sortDirection={sortState.column === 'invoice' ? sortState.direction : null}
						onSort={handleSort('invoice')}
					>
						Invoice
					</Table.HeaderCell>
					<Table.HeaderCell
						sortable
						sortDirection={sortState.column === 'status' ? sortState.direction : null}
						onSort={handleSort('status')}
					>
						Status
					</Table.HeaderCell>
					<Table.HeaderCell
						sortable
						sortDirection={sortState.column === 'method' ? sortState.direction : null}
						onSort={handleSort('method')}
					>
						Method
					</Table.HeaderCell>
					<Table.HeaderCell
						sortable
						sortDirection={sortState.column === 'amount' ? sortState.direction : null}
						onSort={handleSort('amount')}
					>
						Amount
					</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					{#each sortedData as row (row.id)}
						<Table.BodyRow>
							<Table.BodyCell>{row.invoice}</Table.BodyCell>
							<Table.BodyCell>{row.status}</Table.BodyCell>
							<Table.BodyCell>{row.method}</Table.BodyCell>
							<Table.BodyCell>${row.amount}.00</Table.BodyCell>
						</Table.BodyRow>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{/snippet}
</Story>

<Story name="Clickable Rows">
	{#snippet template()}
		<div style="padding: 20px;">
			<h3 style="margin: 0 0 16px; font-size: 14px; font-weight: 600;">Clickable Rows</h3>
			<p style="margin: 0 0 16px; font-size: 12px; color: #666;">
				Click on any row to see the row data and index in an alert.
			</p>
			<Table.Root hoverable={true}>
				<Table.Header>
					<Table.HeaderCell>Invoice</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Method</Table.HeaderCell>
					<Table.HeaderCell>Amount</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					{#each rawData as row, index (row.id)}
						<Table.BodyRow
							onClick={() => {
								alert(
									`Clicked row ${index + 1}: ${row.invoice} - ${row.status} ($${row.amount}.00)`
								);
							}}
						>
							<Table.BodyCell>{row.invoice}</Table.BodyCell>
							<Table.BodyCell>{row.status}</Table.BodyCell>
							<Table.BodyCell>{row.method}</Table.BodyCell>
							<Table.BodyCell>${row.amount}.00</Table.BodyCell>
						</Table.BodyRow>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{/snippet}
</Story>
