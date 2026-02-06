/** Type of tree element resource */
export type TreeElementType = 'agent' | 'component' | 'nli';
export interface TreeResourceIconProps {
    /** Whether to show up connector */
    upConnector?: boolean;
    /** Whether to show down connector */
    downConnector?: boolean;
    /** Type of resource */
    type: TreeElementType;
    /** Additional CSS class */
    class?: string;
}
declare const TreeResourceIcon: import("svelte").Component<TreeResourceIconProps, {}, "">;
type TreeResourceIcon = ReturnType<typeof TreeResourceIcon>;
export default TreeResourceIcon;
