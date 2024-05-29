import express from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import { script, sleep } from "chalk-scripts"

const PORT = 4000
const app = express()

app.get("/", async (req, res) => {
  const c = await script.start({ func: "app.get(/)" })
  await script.config(c).default("Writing To Logs works!").log().save()
  res.send("Check your .logs folder!")
})

app.get("/test1", async (req, res) => {
  const c = await script.start({ func: "app.get(/test1)" })
  script.config(c).default("ref1").log()
  await sleep(500)
  script.config(c).default("ref1").log()
  await sleep(501)
  script.config(c).warning("ref1").log()
  await sleep(502)
  script.config(c).default("ref1").log()
  res.send("test complete")
})

app.get("/test2", async (req, res) => {
  const c = await script.start({ func: "app.get(/test2)" })
  await script.config(c).default("test 1").log().save()
  await script.config(c).default("test 2").log().save()
  await script.config(c).sid("939").default("test 3").log().save()
  await script.config(c).sid("939").default("test 4").log().save()
  await sleep(501)
  res.send("test complete")
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
