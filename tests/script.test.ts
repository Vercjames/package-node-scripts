import { script, sleep } from "../packages/index_old" // Adjust the import based on your file structure

describe("Script module tests", () => {
  beforeAll(() => {
    // Setup if any
  })

  test("Time elapsed between logs should be correct", async () => {
    script.start()
    await sleep(500)
    const log1 = await script.report({ text: "half a second passed" })
    expect(log1.elapsed).toBeCloseTo(0.5, 1)

    await sleep(1000)
    const log2 = await script.report({ text: "one more second passed" })
    expect(log2.elapsed).toBeCloseTo(1.0, 1)
    script.finish()
  })
})
