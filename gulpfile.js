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

// Update bower, component, npm at once:
const bump = require('gulp-bump');
gulp.task('bump-prerelease', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'prerelease'}))
  .pipe(gulp.dest('./'));
});
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
