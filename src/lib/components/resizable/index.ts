import ResizablePaneGroup from './resizable-pane-group.svelte';
import { Pane } from 'paneforge';
import ResizablePaneResizer from './resizable-handle.svelte';

const Resizable = {
	PaneGroup: ResizablePaneGroup,
	Pane,
	PaneResizer: ResizablePaneResizer
};

export { Resizable, Resizable as default };
export type { Pane } from 'paneforge';
