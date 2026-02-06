import { type TreeElementType } from './TreeResourceIcon.svelte';
import { type TreeElementDetailsProps } from './TreeElementDetails.svelte';
/**
 * Props for a TreeElement component.
 *
 * @important TreeElement must be used within a container with `role="tree"` for proper accessibility.
 * @example
 * ```svelte
 * <div role="tree" aria-label="File tree">
 *   <Tree.Element type="agent" label="Root" indentLevel={0} />
 *   <Tree.Element type="nli" label="Child" indentLevel={1} />
 * </div>
 * ```
 */
export interface TreeElementProps {
    /** Whether the tree element is expanded */
    expanded?: boolean;
    /** Callback fired when expand state changes */
    onExpandChange?: (expanded: boolean) => void;
    /** Whether the element is selected */
    selected?: boolean;
    /** Callback fired when selection state changes */
    onSelectionChange?: (selected: boolean) => void;
    /** Type of resource */
    type: TreeElementType;
    /** Label text for the tree element */
    label: string;
    /** Optional details to display */
    details?: Omit<TreeElementDetailsProps, 'class'>;
    /** Indentation level. Must be 0 or greater */
    indentLevel?: number;
    /** Whether to show a vertical line connecting to the previous sibling */
    upConnector?: boolean;
    /** Whether to show a vertical line connecting to the next sibling or expanded children */
    downConnector?: boolean;
    /** Whether to show a horizontal branch line connecting parent to this child */
    inwardTrail?: boolean;
    /** Optional badge count to display after the icon */
    badgeCount?: number;
    /** Whether the element can be expanded */
    canExpand?: boolean;
    /** Array of booleans indicating which indent levels should show vertical lines.
     * Array is indexed left to right (indentLines[0] is leftmost, indentLines[n-1] is rightmost).
     * indentLines.length should equal indentLevel.
     * For example, [true, false, true] means show line at levels 0 and 2, but not at level 1. */
    indentLines?: boolean[];
    /** Additional CSS class */
    class?: string;
    /** Tab index for focus management (0 = tabbable, -1 = not in tab order) */
    tabIndex?: number;
    /** Keyboard event handler */
    onkeydown?: (event: KeyboardEvent) => void;
    /** Focus event handler */
    onfocus?: (event: FocusEvent) => void;
}
declare const TreeElement: import("svelte").Component<TreeElementProps, {}, "selected" | "expanded">;
type TreeElement = ReturnType<typeof TreeElement>;
export default TreeElement;
