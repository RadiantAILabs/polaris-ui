export interface TreeTrailProps {
    /** Whether to show vertical line down */
    down?: boolean;
    /** Whether to show outward trail */
    outward?: boolean;
    /** Whether to show inward trail */
    inward?: boolean;
    /** Additional CSS class */
    class?: string;
}
declare const TreeTrail: import("svelte").Component<TreeTrailProps, {}, "">;
type TreeTrail = ReturnType<typeof TreeTrail>;
export default TreeTrail;
