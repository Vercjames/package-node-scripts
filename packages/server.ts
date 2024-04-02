import express from "express"
import { Logger, Scripting } from "./index" // Adjust the import based on your file structure

const app = express()

app.get("/poke", async (req, res) => {
  // const group = script.start("loginFn")
  // await script.reports(group, { text: "this is a report" }) // nocolor
  // await sleep(523)
  // await script.success(group, { text: "this is a success" }) // green
  // await sleep(534)
  // await script.details(group, { text: "this is a detail" }) // blue
  // await sleep(544)
  // await script.warning(group, { text: "this is a warning" }) // orange
  // await sleep(544)
  // await script.mistake(group, { text: "this is an error" }) // red
  // script.finish(group)
  //
  // res.send("Logging example complete")
})

app.get("/", async (req, res) => {
  // logger.config.js
  // const example = {
  //   // INSTRUCTION: this is where all files are saved by default
  //   root: "mylogs",
  //   // INSTRUCTION: this is the order of what items are logged when .log() is called. type and report are always logged
  //   // EXAMPLE: const evt = script.start("LoginFn")
  //   // EXAMPLE: script.group(evt).id("536").report("this is a report").log("success")
  //   // RESULT: ID: [0000000536] -> Elapsed: [0000.0010] -> Group: [LoginFn(5928)] -> [SUCCESS] this is a report
  //   logDetails: ["id", "elapsed", "group"]
  //   // COLORS: ID: [YELLOW] -> Elapsed: [YELLOW] -> Group: [YELLOW] -> [GREEN]
  // }

  // INSTRUCTION: .group(evt) is optional. by default, it will print "unspecified" when no group is present.
  // INSTRUCTION: .id(string) is optional. by default, it will print "0000000000" when id present.
  // INSTRUCTION: .id(string) is used for the file name. ergo .id("123") would produce a file named 0000000123.json
  // INSTRUCTION: .id(string) when logged will also print all 10 characters. ergo .id("1234567") will print "id": {"id":"0001234567", ... }
  // INSTRUCTION: .report(string) is the text string containing the report itself.
  // INSTRUCTION: .log() determines if we will console.log by default.
  // INSTRUCTION: .group(evt) if event is provided, we add () and a random 4 digit code to items grouped. ergo: LoginFn(5928)
  // Starting the logging process
  // const evt = script.start("LoginFn")

  const scriptConfig = {
    root: "mylogs",
    group: "LoginFn",
    folder: "testFolder",
    logDetails: ["id", "elapsed", "group"] // Add other configurations as required
  }

  // Create a logger instance
  const script = new Scripting(loggerConfig)

  // Perform some operations, log, and save them
  await script.id("123").report("This is a success report").log().save()
  await script.group(evt).id("123").report("This is an error report").log("mistake")
    .save("testFolder2")
  await script.group(evt).id("5423").report("This is another report").save("testFolder3")

  // Finalize the logging process
  script.finish()

  script.finish(evt)
  // console.log(log1) /// {"id":"0000000123", createdAt: utcTimeStamp, elapsed: [0000.0010], group: LoginFn(5928), type: "success", report: this is a report },
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
