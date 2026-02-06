import type { RecurrenceSchedule } from './models';
export interface ScheduleSelectorProps {
    /** Currently selected recurrence schedule, bindable with bind:selected */
    value: RecurrenceSchedule | null;
    /** Callback fired when the schedule selection changes */
    onValueChange?: (schedule: RecurrenceSchedule | null) => void;
    /** Locale for formatting dates and times. Defaults to browser language
     * if not specified */
    locale?: string;
    /** Additional class for styling */
    class?: string;
}
declare const ScheduleSelector: import("svelte").Component<ScheduleSelectorProps, {}, "value">;
type ScheduleSelector = ReturnType<typeof ScheduleSelector>;
export default ScheduleSelector;
