import pkg from './package.json';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';


/** @type {import('rollup').RollupOptions} */
let config = {
	input: pkg.source,
	output: [
		{ file: pkg.module, format: 'esm' },
		{ file: pkg.main, format: 'cjs' },
	],
	plugins: [
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
