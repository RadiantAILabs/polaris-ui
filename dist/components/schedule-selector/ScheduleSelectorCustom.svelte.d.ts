import { ZonedDateTime } from '@internationalized/date';
import { type RecurrenceSchedule } from './models';
import './ScheduleSelectorCustom.scss';
export interface ScheduleSelectorCustomProps {
    value: RecurrenceSchedule;
    onValueChange?: (value: RecurrenceSchedule) => void;
    class?: string;
    defaultEndDate?: ZonedDateTime;
    defaultOccurrences?: number;
}
declare const ScheduleSelectorCustom: import("svelte").Component<ScheduleSelectorCustomProps, {}, "value">;
type ScheduleSelectorCustom = ReturnType<typeof ScheduleSelectorCustom>;
export default ScheduleSelectorCustom;
