import { type WithElementRef } from '../../utils';
import type { HTMLAttributes } from 'svelte/elements';
import type { BadgeProps } from './Badge.svelte';
export type BadgeGroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    badges: Array<Omit<BadgeProps, 'ref'>>;
    dynamicSizing?: boolean;
};
declare const BadgeGroup: import("svelte").Component<BadgeGroupProps, {}, "ref">;
type BadgeGroup = ReturnType<typeof BadgeGroup>;
export default BadgeGroup;
