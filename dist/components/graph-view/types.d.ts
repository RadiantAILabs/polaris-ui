/** A node in the agent graph. */
export interface GraphNodeData {
    /** Unique node identifier. */
    id: string;
    /** Human-readable node name. */
    name: string;
    /** Node type classification. */
    nodeType: 'system' | 'decision' | 'switch' | 'loop' | 'parallel' | 'join';
}
/** An edge connecting two nodes. */
export interface GraphEdgeData {
    /** Source node ID. */
    from: string;
    /** Target node ID. */
    to: string;
    /** Edge type classification. */
    edgeType: 'sequential' | 'conditional' | 'parallel' | 'loop_back' | 'error' | 'timeout';
    /** Optional edge label (e.g., branch name). */
    label?: string;
}
/** Complete graph specification (matches backend GraphSpec JSON). */
export interface GraphSpec {
    /** All nodes in the graph. */
    nodes: GraphNodeData[];
    /** All edges connecting nodes. */
    edges: GraphEdgeData[];
    /** Entry point node ID. */
    entry?: string;
}
/** Props for the GraphView component. */
export interface GraphViewProps {
    /** Graph specification to render. */
    spec: GraphSpec;
    /** ID of the currently active/executing node (highlighted). */
    activeNodeId?: string;
    /** Callback when a node is clicked. */
    onNodeClick?: (nodeId: string) => void;
    /** Optional CSS class name. */
    class?: string;
}
