import pkg from './package.json';
import esbuild from 'rollup-plugin-esbuild';


/** @type {import('rollup').RollupOptions} */
let config = {
	input: pkg.source,
	output: [
		{ file: pkg.module, format: 'esm' },
		{ file: pkg.main, format: 'cjs' },
	],
	external: ['svelte/store'],
	plugins: [
		esbuild({
			target: 'es2020',
			watch: !!process.env.ROLLUP_WATCH,
		}),
	],
};

export default config;
