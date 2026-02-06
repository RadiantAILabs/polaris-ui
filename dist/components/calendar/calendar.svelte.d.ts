import { Calendar as CalendarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
import * as Calendar from './index.js';
import { type DateValue } from '@internationalized/date';
import type { Snippet } from 'svelte';
export type CalendarProps = WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
    /** Layout style for the calendar caption/header */
    captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
    /** Array of month options for dropdown selection */
    months?: CalendarPrimitive.MonthSelectProps['months'];
    /** Array of year options for dropdown selection */
    years?: CalendarPrimitive.YearSelectProps['years'];
    /** Format for displaying month names */
    monthFormat?: CalendarPrimitive.MonthSelectProps['monthFormat'];
    /** Format for displaying year values */
    yearFormat?: CalendarPrimitive.YearSelectProps['yearFormat'];
    /** Custom snippet for rendering individual day cells */
    day?: Snippet<[{
        day: DateValue;
        outsideMonth: boolean;
    }]>;
};
declare const Calendar: import("svelte").Component<CalendarProps, {}, "placeholder" | "value" | "ref">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
