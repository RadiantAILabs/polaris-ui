import { type WithElementRef } from '../../utils';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { type VariantProps } from 'tailwind-variants';
import type { IconName } from '../icon/icon-registry';
export declare const buttonVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        primary: string;
        secondary: string;
        invisible: string;
        destructive: string;
    };
    size: {
        small: string;
        base: string;
        large: string;
    };
}, undefined, string, {
    variant: {
        primary: string;
        secondary: string;
        invisible: string;
        destructive: string;
    };
    size: {
        small: string;
        base: string;
        large: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    variant: {
        primary: string;
        secondary: string;
        invisible: string;
        destructive: string;
    };
    size: {
        small: string;
        base: string;
        large: string;
    };
}, undefined, string, unknown, unknown, undefined>>;
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
export type IconPosition = 'left' | 'right';
export type ButtonProps = WithElementRef<HTMLButtonAttributes> & WithElementRef<HTMLAnchorAttributes> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    label?: string;
    icon?: IconName;
    iconPosition?: IconPosition;
    counterBadge?: number;
    badge?: string;
};
declare const Button: import("svelte").Component<ButtonProps, {}, "ref">;
type Button = ReturnType<typeof Button>;
export default Button;
