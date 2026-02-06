export interface TreeElementDetailsProps {
    /** Time duration to display */
    time?: string;
    /** Token count to display */
    tokens?: string;
    /** Status of the element */
    status?: 'completed' | 'processing' | 'failed';
    /** Additional CSS class */
    class?: string;
}
declare const TreeElementDetails: import("svelte").Component<TreeElementDetailsProps, {}, "">;
type TreeElementDetails = ReturnType<typeof TreeElementDetails>;
export default TreeElementDetails;
