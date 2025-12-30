import fs from 'node:fs/promises';
import path from 'node:path';
import plugin from '../src';

function isSourceFile(value: string): boolean {
  const ext = path.extname(value);
  return ext === '.ts' && !value.endsWith('.d.ts');
}

describe('package', () => {
  const pkg = path.resolve('src');

  it('exists', () => {
    expect(plugin).toBeDefined();
  });

  it('has every rule', async () => {
    const files = await fs.readdir(path.join(pkg, 'rules'));
    for (const file of files.filter(isSourceFile)) {
      const ruleName = path.basename(file, path.extname(file));
      expect(plugin.rules).toHaveProperty(ruleName);
    }
  });

  it('has metadata', () => {
    expect(plugin.meta).toBeDefined();

    expect(plugin.meta.name).toBe('eslint-plugin-rxjs-angular-x');
    expect(plugin.meta.version).toBeDefined();
    expect(plugin.meta.namespace).toBe('rxjs-angular-x');
  });
});
