import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      presets: [
        ["es2015", { "modules": false }]
      ],
      "plugins": ["external-helpers"],
      exclude: 'node_modules/**',
    }),
    commonjs({
      namedExports: {
        'node_modules/graphql-tools/dist/index.js': ['makeExecutableSchema'],
      },
    }),
  ],
  dest: 'dist/index.js',
};
