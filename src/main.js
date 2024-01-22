import express from 'express';
import { readFile, writeFile, rm } from 'fs/promises';
import Mocha from 'mocha';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {

  try {
    const code = req.body.code;

    const mocha = new Mocha({});

    const testTempleateFile = await readFile('src/templates/fst-exercise/exercise.test.cjs', 'utf8')

    // generate random file name
    const randomName = uuidv4()
    const tempFileName = `src/tmp/fst-exercise/${randomName}.cjs`
    await writeFile(
      tempFileName,
      `${code}
      module.exports = twoSum;
      `,
      'utf8'
    )

    const testFileName = `src/tmp/fst-exercise/${uuidv4()}.test.cjs`
    await writeFile(
      testFileName,
      testTempleateFile.replace('{{exercise_name}}', `./${randomName}.cjs`),
      'utf8'
    )

    mocha.addFile(testFileName)

    const results = []

    mocha.run()
      .on('pass', function (test) {
        results.push({
          title: test.title,
          state: 'passed'
        })
      })
      .on('fail', function (test, err) {
        results.push({
          title: test.title,
          state: 'failed',
          err: err
        })
      })
      .on('end', async function () {
        // delete temp files
        await rm(tempFileName)
        await rm(testFileName)

        return res.send(results)
      });

  }catch (e) {
    console.log(e)
    return res.status(500).send('Internal server error')
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})