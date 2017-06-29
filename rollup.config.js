// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'src/react-main.js',
    format: 'iife',
    //cjs commonjs module.exports
    //amd define
    //es export default
    //iife var main=function(){}()
    //umd amd+cjs+iife
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**' // 仅仅转译我们的源码
        }),
        
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            // include: 'node_modules/**', // Default: undefined
            exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: ['.js', '.coffee'], // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false, // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false, // Default: true

            // explicitly specify unresolvable named exports
            // (see below for more details)
            // namedExports: { './module.js': ['foo', 'bar'] }, // Default: undefined

            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            ignore: ['conditional-runtime-dependency']
        }),
        replace({
            "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    dest: 'dist/bundle.js',
    sourceMap: true
};