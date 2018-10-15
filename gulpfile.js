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
const rollup = require('rollup');
const closure = require('rollup-plugin-closure-compiler-js');
const babel = require('rollup-plugin-babel');

const babelConfig={
			exclude: ['node_modules/**','experimental/**'],
			//plugins: ['external-helpers'],
			//externalHelpers: true
		}

gulp.task('buildClean', () => {
  return rollup.rollup({
    input: './src/main.js',
  }).then(bundle => {
    return bundle.write({
      file: './dist/kabini.js',
      format: 'cjs',//'umd',
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

const jsdoc = require('gulp-jsdoc3');
gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});


const git = require('gulp-git'),
    filter = require('gulp-filter'),
    tagVersion = require('gulp-tag-version');
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
const bump = require('gulp-bump');
gulp.task('bump-prerelease', e=>inc('prerelease'));
gulp.task('bump-patch', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});
gulp.task('bump-minor', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});
gulp.task('bump-major', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});


gulp.task('build',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-prerelease']);
gulp.task('build-patch',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-patch']);
gulp.task('build-minor',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-minor']);
gulp.task('build-major',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-major']);
