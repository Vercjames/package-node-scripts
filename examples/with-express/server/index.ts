import express from "express"
import { script, sleep } from "chalk-scripts"

const app = express()

app.get("/test1", async (req, res) => {
  const ref1 = await script.start({ func: "ref1Fn" })
  script.config(ref1).report("ref1").log()
  await sleep(500)
  script.config(ref1).detail("ref1").log()
  await sleep(501)
  script.config(ref1).alerts("ref1").log()
  await sleep(502)
  script.config(ref1).errors("ref1").log()
  res.send("test complete")
})

app.get("/test2", async (req, res) => {
  const ref2 = await script.start({ func: "ref2Fn" })
  await script.config(ref2).report("test 1").log().save()
  await script.config(ref2).report("test 2").log().save()
  await script.config(ref2).sid("939").report("test 3").log().save()
  await script.config(ref2).sid("939").report("test 4").log().save()
  await sleep(501)
  res.send("test complete")
})

app.get("/test3", async (req, res) => {
  script.config({}).report("test3").log()
  res.send("test complete")
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
