import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}

export type WithElementRef<T> = T & {
	ref?: HTMLElement | null;
};
