'use strict';

import gulp from 'gulp';
import {buildTileset, buildTilesetCityGML} from './src/task.js';
import {buildDebugTileset} from './src/debug.js';
import config from './config.json';

// pass-parameters-gulp-tasks
// ref 
//   https://www.sitepoint.com/pass-parameters-gulp-tasks/
//   https://stackoverflow.com/questions/28538918/pass-parameter-to-gulp-task
//   https://github.com/gulpjs/gulp/blob/master/docs/recipes/pass-arguments-from-cli.md
//     https://github.com/substack/minimist
//
const arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
      if (opt === thisOpt) {
        // argument value
        if (curOpt) arg[curOpt] = opt;
        curOpt = null;
      }
      else {
        // argument name
        curOpt = opt;
        arg[curOpt] = true;
      }
    }
    return arg;
})(process.argv);

function debug() {
    return buildDebugTileset(config, arg.tileset);
}
exports.debug = debug;

function model() {
    return buildTileset(config, arg.tileset);
}
exports.model = model;

function citygml(cb) {
    buildTilesetCityGML(config, arg.tileset);
    cb();
}
exports.citygml = citygml;

//export default gulp.parallel(hdmap,vworld_building,drone);

/** 
 * references
 * What is gulp-multi-thread-task
 *   https://github.com/CT1994/gulp-multi-thread-task
 * 
 * gulp-image-resize
 *   https://www.npmjs.com/package/gulp-image-resize
 *   https://www.npmjs.com/package/image-js
 * 
 * https://github.com/izrik/FbxSharp
 * 
 * Gulp condition inside pipe
 *   https://stackoverflow.com/questions/27181719/gulp-condition-inside-pipe
 *   case 1
 *     .pipe(gulpif(condition1, g.dest(output.css)))
 *   case 2
 *      gulp.task('task', function () {
        let stream = gulp.src(sources.sass)
            .pipe(changed(output.css)).pipe(sass({
            style: 'compressed',
            sourcemap: true
            }));
        if (2 + 2 === 4) {
            stream = stream
            .pipe(someModule())
            .pipe(someModule2());
        }
        else {
            stream = stream
            .pipe(someModule3())
            .pipe(someModule4());
        }
        stream = stream.pipe(notify('scss converted to css and compressed'));
        return stream;
    }); 
 * 
*/