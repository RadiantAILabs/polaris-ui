import fs from 'fs';
import path from 'path';

const iconsDir = 'src/lib/components/icon/icons';
const outputFile = 'src/lib/components/icon/icon-registry.ts';

// Prefix every identifier so numeric names and reserved words remain valid.
function toCamelCase(str: string): string {
	const camelCase = str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
	return `icon_${camelCase.replace(/-/g, '_')}`;
}

const iconFiles = fs
	.readdirSync(iconsDir)
	.filter((file) => file.endsWith('.svg'))
	.sort()
	.map((file) => ({
		filename: path.basename(file, '.svg'),
		identifier: toCamelCase(path.basename(file, '.svg'))
	}));

const identifiers = new Set<string>();
for (const { filename, identifier } of iconFiles) {
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(filename)) {
		throw new Error(`Invalid icon filename: ${filename}.svg (expected lowercase kebab-case)`);
	}
	if (identifiers.has(identifier)) {
		throw new Error(`Icon import identifier collision: ${filename}`);
	}
	identifiers.add(identifier);
}

const imports = iconFiles
	.map(({ filename, identifier }) => `import ${identifier} from './icons/${filename}.svg?raw';`)
	.join('\n');

const registryEntries = iconFiles
	.map(({ filename, identifier }, index) => {
		const key = filename.includes('-') || /^\d/.test(filename) ? `'${filename}'` : filename;
		const comma = index === iconFiles.length - 1 ? '' : ',';
		return `	${key}: ${identifier}${comma}`;
	})
	.join('\n');

const content = `// Auto-generated icon registry
${imports}

export const iconRegistry = {
${registryEntries}
} as const;

export type IconName = keyof typeof iconRegistry;
`;

fs.writeFileSync(outputFile, content);
console.log(`Generated icon registry with ${iconFiles.length} icons`);
