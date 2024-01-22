import Mocha from 'mocha';

const mocha = new Mocha({});

mocha.addFile('src/tmp/fst-exercise/61631cd1-34c0-4724-b2c0-4f1b85378a6b.test.cjs')

mocha.run()
    .on('test', function (test) {
        // console.log('Test started: ' + test.title);
    })
    .on('test end', function (test) {
        // console.log('Test done: ' + test.title);
    })
    .on('pass', function (test) {
        // console.log('Test passed');
        // console.log(test);
    })
    .on('fail', function (test, err) {
        // console.log('Test fail');
        // console.log(test);
        // console.log(err);
    })
    .on('end', function () {
        // console.log('All done');
    });