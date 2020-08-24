import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';


/** @type {import('rollup').RollupOptions} */
let config = {
	input: pkg.source,
	output: [
		{ file: pkg.module, format: 'esm' },
		{ file: pkg.main, format: 'cjs' },
	],
	external: ['react'],
	plugins: [
		alias({
			entries: {
				'preact/hooks': 'react',
			},
		}),
		resolve({ browser: true }),
		esbuild({
			target: 'esnext',
			watch: !!process.env.ROLLUP_WATCH,
		}),
	],
};

export default config;
