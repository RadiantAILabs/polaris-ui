import type { ZonedDateTime } from '@internationalized/date';
/**
 * Days of the week that can be selected for weekly recurrence patterns.
 */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
/**
 * Defines when a recurring schedule should end.
 * - never: Schedule continues indefinitely
 * - on: Schedule ends on a specific date
 * - after: Schedule ends after a certain number of occurrences
 */
export type RepeatEndCondition = {
    type: 'never';
} | {
    type: 'on';
    date: ZonedDateTime;
} | {
    type: 'after';
    occurrences: number;
};
/**
 * Discriminated union defining different recurrence patterns.
 * Each pattern type has its own specific properties:
 * - none: No recurrence
 * - minute: Repeats every N minutes
 * - hour: Repeats every N hours
 * - daily: Repeats every N days
 * - weekly: Repeats every N weeks, optionally on specific days
 * - monthly: Repeats every N months
 * - yearly: Repeats every N years
 */
export type RecurrencePattern = {
    type: 'minute';
    interval: number;
} | {
    type: 'hour';
    interval: number;
} | {
    type: 'daily';
    interval: number;
} | {
    type: 'weekly';
    interval: number;
    daysOfWeek: DayOfWeek[];
} | {
    type: 'monthly';
    interval: number;
} | {
    type: 'yearly';
    interval: number;
};
/**
 * Recurrence schedule consisting in a pattern with an end condition.
 */
export interface RecurrenceSchedule {
    pattern: RecurrencePattern;
    endCondition: RepeatEndCondition;
}
/**
 * Type guard to check if a pattern is weekly and has daysOfWeek property.
 * Use this to safely access the daysOfWeek array.
 */
export declare const isWeeklyPattern: (pattern: RecurrencePattern) => pattern is Extract<RecurrencePattern, {
    type: "weekly";
}>;
/**
 * Type guard to check if an end condition has a specific date.
 * Use this to safely access the date property.
 */
export declare const hasEndDate: (condition: RepeatEndCondition) => condition is Extract<RepeatEndCondition, {
    type: "on";
}>;
/**
 * Type guard to check if an end condition has an occurrence limit.
 * Use this to safely access the occurrences property.
 */
export declare const hasOccurrenceLimit: (condition: RepeatEndCondition) => condition is Extract<RepeatEndCondition, {
    type: "after";
}>;
/**
 * Converts a RecurrenceSchedule into a human-readable description string.
 * Examples:
 * - "Daily"
 * - "Every 2 weeks on Mon, Wed, Fri"
 * - "Monthly, 5 occurrences"
 * - "Every weekday"
 */
export declare const getScheduleDescription: (schedule: RecurrenceSchedule | null, locale: string) => string;
