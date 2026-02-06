// Utility to get all available icon names at build time
export function getAvailableIcons(): string[] {
	// This uses Vite's glob import to get all SVG files
	const iconModules = import.meta.glob('./icons/*.svg', { eager: false });

	return Object.keys(iconModules).map((path) => {
		// Extract filename without extension from path like './icons/star.svg'
		return path.replace('./icons/', '').replace('.svg', '');
	});
}

// Get icon names for TypeScript autocomplete
export type IconName = ReturnType<typeof getAvailableIcons>[number];
