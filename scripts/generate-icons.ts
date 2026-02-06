import fs from 'fs';
import path from 'path';

const iconsDir = 'src/lib/components/icon/icons';
const outputFile = 'src/lib/components/icon/icon-registry.ts';

// Convert kebab-case to camelCase for valid JS identifiers
function toCamelCase(str: string): string {
	const camelCase = str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
	// Handle reserved keywords by adding 'Icon' suffix
	const reservedWords = ['export', 'import', 'default', 'class', 'const', 'let', 'var', 'function'];
	return reservedWords.includes(camelCase) ? camelCase + 'Icon' : camelCase;
}

const iconFiles = fs
	.readdirSync(iconsDir)
	.filter((file) => file.endsWith('.svg'))
	.map((file) => ({
		filename: path.basename(file, '.svg'),
		identifier: toCamelCase(path.basename(file, '.svg'))
	}));

const imports = iconFiles
	.map(({ filename, identifier }) => `import ${identifier} from './icons/${filename}.svg?raw';`)
	.join('\n');

const registryEntries = iconFiles
	.map(({ filename, identifier }, index) => {
		const key = filename.includes('-') ? `'${filename}'` : filename;
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
