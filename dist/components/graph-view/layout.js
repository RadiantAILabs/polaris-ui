import dagre from '@dagrejs/dagre';
const NODE_WIDTH = 180;
const NODE_HEIGHT = 50;
/**
 * Compute dagre auto-layout for the given nodes and edges.
 * Returns a new array of nodes with computed positions.
 */
export function computeLayout(nodes, edges, direction = 'TB') {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({
        rankdir: direction,
        nodesep: 50,
        ranksep: 80,
        marginx: 20,
        marginy: 20
    });
    for (const node of nodes) {
        g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    }
    for (const edge of edges) {
        g.setEdge(edge.source, edge.target);
    }
    dagre.layout(g);
    return nodes.map((node) => {
        const pos = g.node(node.id);
        return {
            ...node,
            position: {
                // dagre positions are center-based; xyflow expects top-left
                x: pos.x - NODE_WIDTH / 2,
                y: pos.y - NODE_HEIGHT / 2
            }
        };
    });
}
