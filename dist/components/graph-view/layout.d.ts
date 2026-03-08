import type { Node, Edge } from '@xyflow/svelte';
/**
 * Compute dagre auto-layout for the given nodes and edges.
 * Returns a new array of nodes with computed positions.
 */
export declare function computeLayout(nodes: Node[], edges: Edge[], direction?: 'TB' | 'LR'): Node[];
