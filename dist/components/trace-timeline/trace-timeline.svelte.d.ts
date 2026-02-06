export interface TraceTimelineBar {
    /** Start time in milliseconds */
    startTime: number;
    /** Duration in milliseconds */
    duration: number;
    /** Optional label or identifier for the bar */
    label?: string;
}
export interface TraceTimelineProps {
    /** Array of bars to display in the timeline (null for empty rows) */
    bars: (TraceTimelineBar | null)[];
    /** Optional CSS class name */
    class?: string;
    /** Minimum pixels between grid lines (default: 80) */
    minGridSpacing?: number;
}
declare const TraceTimeline: import("svelte").Component<TraceTimelineProps, {}, "">;
type TraceTimeline = ReturnType<typeof TraceTimeline>;
export default TraceTimeline;
