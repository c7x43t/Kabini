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
	jsdoc = require('gulp-jsdoc3'),
	fs = require('fs'),
	ClosureCompiler = require('google-closure-compiler').compiler;
	
const babelConfig={
	babelrc: false,
	exclude: ['node_modules/**','experimental/**'],
	presets: [ 
		[ 'es2015', { "modules": false } ]
	],
	plugins: ['external-helpers'],
	externalHelpers: true
}

const inputFile='./src/main.js';
const paths = {
	buildDir: './dist/',
    scripts: ".src/**",
}
gulp.task('buildClean', () => {
  const dir=paths.buildDir+'kabini.js';
  
  return rollup.rollup({
    input: inputFile,
	plugins:[
		nodeResolve({jsnext: true}),
		commonjs()
	]
  }).then(bundle => {
	  for(let i=0;i<bundle.modules.length;i++){
		  bundle.modules[i].code=bundle.modules[i].code.replace("module.test=","")
		  bundle.modules[i].originalCode=bundle.modules[i].originalCode.replace("module.test=","")
	  }
	  console.log(JSON.stringify(Object.keys(bundle)));
    return bundle.generate({
      file: dir,
      format: 'iife',
      name: 'kabini',
      sourcemap: true
    })
	.then((result)=>{
		// FIXED: set the correct scope by detaching from module.exports
		let code=result.code.replace(/module.[\s\S]+?=/g,'');
		fs.writeFile(dir, code, err=>err?console.log(err):null);
		console.log(ClosureCompiler.COMPILER_PATH); // absolute path the compiler jar
		console.log(ClosureCompiler.CONTRIB_PATH); // absolute path the contrib folder which contains
		 
		const closureCompiler = new ClosureCompiler({
		  js: dir,
		  compilation_level: 'SIMPLE_OPTIMIZATIONS'
		});
		 
		const compilerProcess = closureCompiler.run((exitCode, stdOut, stdErr) => {
		  //compilation complete
		  if(stdErr){
			  return console.log(stdErr);
		  }
		  const dirMin=dir.slice(0,dir.length-3)+".min"+dir.slice(dir.length-3,dir.length)
		  fs.writeFile(dirMin, stdOut, err=>err?console.log(err):null);
		});
	});
  });
})
gulp.task('buildEs5', async () => {
  return rollup.rollup({
    input: inputFile,
    plugins: [
		babel(babelConfig),
    ]
  }).then(async bundle => {
    const { code, map }  = await bundle.generate({
      file: './dist/kabini.es5.js',
      format: 'cjs',//'umd',
      name: 'kabini.es5',
      sourcemap: true
    });
	console.log(code)
  });
});
gulp.task('buildMin', () => {
  return rollup.rollup({
    input: inputFile,
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
    input: inputFile,
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

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['buildClean','bump-prerelease']);
});

gulp.task('build-dev',['watch','buildClean','bump-prerelease']);
gulp.task('build',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-prerelease']);
gulp.task('build-patch',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-patch']);
gulp.task('build-minor',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-minor']);
gulp.task('build-major',['buildClean','buildEs5','buildMin','buildEs5Min','doc','bump-major']);

//(function a(){setTimeout(a, 5000)})();