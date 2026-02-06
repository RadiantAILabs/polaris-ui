import { type WithElementRef } from '../../utils';
import type { HTMLAttributes } from 'svelte/elements';
import type { IconName } from '../icon/icon-registry';
import { type IconProps } from '../icon';
export type BadgeProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    text?: string;
    leadingIcon?: IconName;
    iconProps?: Partial<Omit<IconProps, 'name' | 'size'>>;
    showDelete?: boolean;
    onDelete?: () => void;
    disabled?: boolean;
    size?: 'small' | 'base' | 'large';
    variant?: 'default' | 'inverse';
};
declare const Badge: import("svelte").Component<BadgeProps, {}, "ref">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
