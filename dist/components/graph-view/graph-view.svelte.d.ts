export type { GraphViewProps, GraphSpec, GraphNodeData, GraphEdgeData } from './types';
import '@xyflow/svelte/dist/base.css';
import type { GraphViewProps } from './types';
declare const GraphView: import("svelte").Component<GraphViewProps, {}, "">;
type GraphView = ReturnType<typeof GraphView>;
export default GraphView;
