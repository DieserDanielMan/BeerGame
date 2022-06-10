// get the Console class
import { Console } from "console"
// get fs module for creating write streams
import fs from "fs"

// make a new logger
export default  new Console({
    stdout: fs.createWriteStream("normalStdout.txt"),
    stderr: fs.createWriteStream("errStdErr.txt"),
});