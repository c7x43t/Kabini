 /*import  {rollup} from 'rollup';
import closure from 'rollup-plugin-closure-compiler-js';
 /*
rollup({
    entry: './src/main.js',
    plugins: [
        closure()
    ]
});
//*/
const gulp = require('gulp');
	rollup = require('rollup'),
	closure = require('rollup-plugin-closure-compiler-js'),
	commonjs = require('rollup-plugin-node-resolve'),
	nodeResolve = require('rollup-plugin-node-resolve'),
	babel = require('rollup-plugin-babel'),
	git = require('gulp-git'),
	filter = require('gulp-filter'),
	tagVersion = require('gulp-tag-version'),
	bump = require('gulp-bump'),
	jsdoc = require('gulp-jsdoc3');
const babelConfig={
			exclude: ['node_modules/**','experimental/**'],
			//plugins: ['external-helpers'],
			//externalHelpers: true
		}

gulp.task('buildClean', () => {
  return rollup.rollup({
    input: './src/main.js',
	plugins:[
		nodeResolve({jsnext: true}),
		commonjs()
	]
  }).then(bundle => {
    return bundle.write({
      file: './dist/kabini.js',
      format: 'iife',//'umd',
      name: 'kabini',
      sourcemap: true
    });
  });
});
gulp.task('buildEs5', () => {
  return rollup.rollup({
    input: './src/main.js',
    plugins: [
		babel(babelConfig),
    ]
  }).then(bundle => {
    return bundle.write({
      file: './dist/kabini.es5.js',
      format: 'cjs',//'umd',
      name: 'kabini.es5',
      sourcemap: true
    });
  });
});
gulp.task('buildMin', () => {
  return rollup.rollup({
    input: './src/main.js',
    plugins: [
		closure()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './dist/kabini.min.js',
      format: 'cjs',//'umd',
      name: 'kabini.min',
      sourcemap: true
    });
  });
});
gulp.task('buildEs5Min', () => {
  return rollup.rollup({
    input: './src/main.js',
    plugins: [
		babel(babelConfig),
		closure()
    ]
  }).then(bundle => {
    return bundle.write({
      file: './dist/kabini.es5.min.js',
      format: 'cjs',//'umd',
      name: 'kabini.es5.min',
      sourcemap: true
    });
  });
});


gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});



function inc(importance) {
    // get all the files to bump version in
	// return gulp.src(['./package.json', './bower.json'])
    return gulp.src(['./package.json'])
		// bump the version number in those files
		.pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))
        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tagVersion());
}
// Update bower, component, npm at once:

gulp.task('bump-prerelease', e=>inc('prerelease'));
gulp.task('bump-patch', e=>inc('patch'));
gulp.task('bump-minor', e=>inc('minor'));
gulp.task('bump-major', e=>inc('major'));

gulp.task('build-dev',['buildClean','bump-prerelease']);
gulp.task('build',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-prerelease']);
gulp.task('build-patch',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-patch']);
gulp.task('build-minor',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-minor']);
gulp.task('build-major',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-major']);
