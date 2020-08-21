import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import externals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild';


/** @type {import('rollup').RollupOptions} */
let config = {
	input: pkg.source,
	output: [
		{ file: pkg.module, format: 'esm' },
		{ file: pkg.main, format: 'cjs' },
	],
	plugins: [
		alias({
			entries: {
				'preact/hooks': 'react',
			},
		}),
		resolve({ browser: true }),
		externals({
			deps: true,
			optDeps: true,
			peerDeps: true,
			devDeps: false,
		}),
		esbuild({
			target: 'esnext',
			watch: !!process.env.ROLLUP_WATCH,
		}),
	],
};

export default config;
