import express from 'express';
import { readFile, writeFile, rm } from 'fs/promises';
import Mocha from 'mocha';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello World!');
});

const exercises = {
  "test1": "twoSum([2, 7, 11, 15], 9) result: [0, 1]",
  "test2": "twoSum([2, 7, 11, 15], 9) result: [0, 1]",
  "test3": "twoSum([3, 2, 4], 6) result: [1, 2]"
}

app.post('/', async (req, res) => {

  let tempFileName
  let testFileName

  try {
    const code = req.body.code;

    const mocha = new Mocha({});

    const testTempleateFile = await readFile('src/templates/fst-exercise/exercise.test.cjs', 'utf8')

    // generate random file name
    const randomName = uuidv4()
    tempFileName = `src/tmp/fst-exercise/${randomName}.cjs`
    await writeFile(
      tempFileName,
      `${code}
      module.exports = twoSum;
      `,
      'utf8'
    )

    testFileName = `src/tmp/fst-exercise/${uuidv4()}.test.cjs`
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
          title: exercises[test.title],
          state: 'passed'
        })
      })
      .on('fail', function (test, err) {
        results.push({
          title: exercises[test.title],
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
    return res.status(400).send('Error dentro del codigo')
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})