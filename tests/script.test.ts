import { script, sleep } from "../packages"

// Application Sectional || Define Tests
// =================================================================================================
// =================================================================================================
describe("Script module tests", () => {
  beforeAll(() => {
    // Setup if any
  })

  test("Time elapsed between logs should be correct", async () => {
    const c = await script.start({ func: "script.test.ts" })
    await sleep(500)
    const log1 = await script.config(c).default("test 1 - logged and saved").log().save()
    expect(parseFloat(log1.elapsed!)).toBeGreaterThanOrEqual(0.5)
    expect(parseFloat(log1.elapsed!)).toBeLessThanOrEqual(1.0)

    await sleep(1000)
    const log2 = await script.config(c).default("test 2 - logged and saved").log().save()
    expect(parseFloat(log2.elapsed!)).toBeGreaterThanOrEqual(1.5)
    expect(parseFloat(log2.elapsed!)).toBeLessThanOrEqual(2.0)
  })
})
