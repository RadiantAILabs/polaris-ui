import { DropdownMenu, type WithoutChildren } from 'bits-ui';
import { type ButtonProps } from '../button';
import type { IconName } from '../icon/icon-registry';
export type DropdownMenuProps = WithoutChildren<DropdownMenu.RootProps> & {
    buttonLabel: string;
    buttonProps?: Omit<ButtonProps, 'disabled' | 'children'>;
    items: string[] | Array<{
        label: string;
        icon?: IconName;
        href?: string;
    }>;
    contentProps?: WithoutChildren<DropdownMenu.ContentProps>;
    align?: 'start' | 'end';
    disabled?: boolean;
    showIcons?: boolean;
    onSelect?: (value: string) => void;
};
declare const DropdownMenu: import("svelte").Component<DropdownMenuProps, {}, "open">;
type DropdownMenu = ReturnType<typeof DropdownMenu>;
export default DropdownMenu;
