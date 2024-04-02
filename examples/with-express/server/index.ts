import express from "express"
import { script } from "script"

const app = express()
const port = 5001

app.get("/", (req, res) => {
  script.start()
  script.report({ text: "this is a success" }) // green
  script.guide({ text: "this is a report" }) // blue
  script.warns({ text: "this is a warning" }) // orange
  script.error({ text: "this is a red " }) // red
  script.finish()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
