import { getContext, setContext } from 'svelte';
interface TableState {
	readonly hoverable: boolean;
	readonly primaryColumn: boolean;
	readonly stickyHeader: boolean;
}
const key = Symbol('table');
export function setTableContext(state: TableState) {
	setContext(key, state);
}
export function getTableContext(): TableState | undefined {
	return getContext<TableState>(key);
}
