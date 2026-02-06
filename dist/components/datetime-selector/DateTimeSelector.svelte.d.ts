import { type PopoverProps } from '../popover';
import { type CalendarProps } from '../calendar';
import { ZonedDateTime } from '@internationalized/date';
import './DateTimeSelector.scss';
export interface DateTimeSelectorProps extends Omit<PopoverProps, 'children' | 'triggerButtonProps' | 'locale'> {
    /** The selected date and time value */
    value?: ZonedDateTime;
    /** Callback fired when the value changes */
    onValueChange?: (value: ZonedDateTime | undefined) => void;
    /** Locale for formatting dates and times. Defaults to browser language
     * if not specified */
    locale?: string;
    /** Placeholder text when no value is selected */
    placeholder?: string;
    /** Whether the field is required */
    required?: boolean;
    /** ID attribute for the trigger element */
    id?: string;
    /** Name attribute for the hidden form input */
    name?: string;
    /** Accessible label for the datetime selector */
    'aria-label'?: string;
    /** ID of element that labels this datetime selector */
    'aria-labelledby'?: string;
    /** ID of element that describes this datetime selector */
    'aria-describedby'?: string;
    /** Whether the field has a validation error */
    'aria-invalid'?: boolean;
    /** ID of element containing error message */
    'aria-errormessage'?: string;
    /** Props for customizing the trigger button appearance */
    triggerProps?: {
        variant?: 'primary' | 'secondary' | 'invisible';
        size?: 'small' | 'base' | 'large';
    };
    /** Props to pass to the calendar component */
    calendarProps?: CalendarProps;
}
declare const DateTimeSelector: import("svelte").Component<DateTimeSelectorProps, {}, "value">;
type DateTimeSelector = ReturnType<typeof DateTimeSelector>;
export default DateTimeSelector;
