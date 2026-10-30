import fs from 'fs';
import path from 'path';
import { format, resolveConfig } from 'prettier';
import { normalizeIcon } from './normalize-icon';

const iconsDir = 'src/lib/components/icon/icons';
const outputFile = 'src/lib/components/icon/icon-registry.ts';
const iconFiles = fs
	.readdirSync(iconsDir)
	.filter((file) => file.endsWith('.svg'))
	.sort();

const registryEntries = iconFiles.map((file) => {
	const name = path.basename(file, '.svg');
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
		throw new Error(`Invalid icon filename: ${file} (expected lowercase kebab-case)`);
	}
	const source = fs.readFileSync(path.join(iconsDir, file), 'utf8');
	return `\t${JSON.stringify(name)}: ${JSON.stringify(normalizeIcon(source))}`;
});

const content = `// Auto-generated icon registry
export const iconRegistry = {
${registryEntries.join(',\n')}
} as const;

export type IconName = keyof typeof iconRegistry;
`;

fs.writeFileSync(
	outputFile,
	await format(content, { ...(await resolveConfig(outputFile)), parser: 'typescript' })
);
console.log(`Generated icon registry with ${iconFiles.length} icons`);
