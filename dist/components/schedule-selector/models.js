import { DateFormatter } from '@internationalized/date';
// ============================================================================
// UTILITIES
// ============================================================================
/**
 * Type guard to check if a pattern is weekly and has daysOfWeek property.
 * Use this to safely access the daysOfWeek array.
 */
export const isWeeklyPattern = (pattern) => pattern.type === 'weekly';
/**
 * Type guard to check if an end condition has a specific date.
 * Use this to safely access the date property.
 */
export const hasEndDate = (condition) => condition.type === 'on';
/**
 * Type guard to check if an end condition has an occurrence limit.
 * Use this to safely access the occurrences property.
 */
export const hasOccurrenceLimit = (condition) => condition.type === 'after';
/**
 * Converts a RecurrenceSchedule into a human-readable description string.
 * Examples:
 * - "Daily"
 * - "Every 2 weeks on Mon, Wed, Fri"
 * - "Monthly, 5 occurrences"
 * - "Every weekday"
 */
export const getScheduleDescription = (schedule, locale) => {
    if (!schedule)
        return 'Does not repeat';
    const { pattern, endCondition } = schedule;
    let baseDescription = '';
    switch (pattern.type) {
        case 'minute':
            baseDescription =
                pattern.interval === 1 ? 'Every minute' : `Every ${pattern.interval} minutes`;
            break;
        case 'hour':
            baseDescription = pattern.interval === 1 ? 'Hourly' : `Every ${pattern.interval} hours`;
            break;
        case 'daily':
            baseDescription = pattern.interval === 1 ? 'Daily' : `Every ${pattern.interval} days`;
            break;
        case 'weekly':
            if (pattern.daysOfWeek.length === 0) {
                baseDescription = pattern.interval === 1 ? 'Weekly' : `Every ${pattern.interval} weeks`;
            }
            else if (pattern.daysOfWeek.length === 5 &&
                pattern.daysOfWeek.every((day) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day))) {
                baseDescription = 'Every weekday';
            }
            else {
                const dayNames = pattern.daysOfWeek.map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3));
                baseDescription =
                    pattern.interval === 1
                        ? `Weekly on ${dayNames.join(', ')}`
                        : `Every ${pattern.interval} weeks on ${dayNames.join(', ')}`;
            }
            break;
        case 'monthly':
            baseDescription = pattern.interval === 1 ? 'Monthly' : `Every ${pattern.interval} months`;
            break;
        case 'yearly':
            baseDescription = pattern.interval === 1 ? 'Yearly' : `Every ${pattern.interval} years`;
            break;
    }
    // Add end condition description
    switch (endCondition.type) {
        case 'never':
            return baseDescription;
        case 'on': {
            const formatter = new DateFormatter(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const date = endCondition.date.toDate();
            return `${baseDescription}, until ${formatter.format(date)}`;
        }
        case 'after':
            return `${baseDescription}, ${endCondition.occurrences} occurrences`;
    }
};
