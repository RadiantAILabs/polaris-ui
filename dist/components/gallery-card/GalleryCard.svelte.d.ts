import { type IconName } from '../icon';
import { type WithElementRef } from '../../utils';
import type { HTMLButtonAttributes } from 'svelte/elements';
export type GalleryCardProps = WithElementRef<HTMLButtonAttributes> & {
    title: string;
    caption?: string;
    icon?: IconName;
    onclick?: () => void;
    size?: 'base' | 'small';
};
declare const GalleryCard: import("svelte").Component<GalleryCardProps, {}, "ref">;
type GalleryCard = ReturnType<typeof GalleryCard>;
export default GalleryCard;
