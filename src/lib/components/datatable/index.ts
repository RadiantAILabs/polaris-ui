import DataTable from './DataTable.svelte';
import DataTableActions from './DataTableActions.svelte';

export { DataTable, DataTableActions };
export type {
	DataTableProps,
	DataTableColumn,
	DataTableSort,
	ColumnType
} from './DataTable.svelte';
export type { DataTableActionsProps, DataTableActionItem } from './DataTableActions.svelte';
export default DataTable;
