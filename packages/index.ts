import fs from "fs"
import path from "path"
import chalk from "chalk"

// Application Component || Define Imports
// =================================================================================================
// =================================================================================================
import {
  TConfigInput,
  TConfigOutput,
  TConstructor,
  TLogOrder,
  TSaveOrder,
  TSaveOutput
} from "./types"

// Application Component || Define Class
// =================================================================================================
// =================================================================================================
class Script {
  private id: string = "xxxxxxxxxx"

  private root: string

  private func: string | null = null

  private file: string | null = null

  private stack: string | null = "xxxxxx"

  private stackTime: number | null = null

  private folder: string | null = null

  private logText: string | null = null

  private logOrder: TLogOrder

  private saveOrder: TSaveOrder

  private logType: "report" | "detail" | "alerts" | "errors" = "report"

  private static defaults = new Script() // Store default values

  private static instance: Script = new Script()

  // eslint-disable-next-line
  private constructor() {
    const configPath = path.join("script.config.json")
    let config: TConstructor = {}
    if (fs.existsSync(configPath)) {
      try {
        const configFile = fs.readFileSync(configPath, { encoding: "utf8" })
        config = JSON.parse(configFile)
      } catch (error) {
        console.error("Error reading config file:", error)
      }
    }
    this.root = config.root || "mylogs"
    this.logOrder = config.logOrder || ["id", "elapsed", "func", "stack"]
    this.saveOrder = config.saveOrder || ["id", "created", "elapsed", "func", "stack"]
  }

  // VERC: Static instance to allow for nuanced log creation
  public static get getInstance(): Script {
    // eslint-disable-next-line
    return this.instance || (this.instance = new this())
  }

  // VERC: Allow for stackName and folder to be set ahead of time for stacking
  public async start(config: TConfigInput): Promise<TConfigOutput> {
    return {
      id: config?.id ?? this.id,
      root: config?.root ?? this.root,
      file: config?.file ?? this.file,
      func: config?.func ?? this.func,
      stack: (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString(),
      stackTime: Date.now(),
      folder: config?.folder ?? this.folder,
      logText: config?.logText ?? this.logText,
      logOrder: config?.logOrder ?? this.logOrder,
      saveOrder: config?.saveOrder ?? this.saveOrder,
      logType: config?.logType ?? this.logType
    }
  }

  public config(config: TConfigInput): this {
    // Iterate over all keys in the config object
    Object.entries(config).forEach(([key, value]) => {
      if (value !== undefined && key in this) {
        // @ts-expect-error
        this[key] = value
      }
    })

    // Reset unspecified properties to their defaults
    Object.keys(this).forEach((key) => {
      if (!(key in config)) {
        // @ts-expect-error
        this[key] = Script.defaults[key]
      }
    })

    return this
  }

  // VERC: Get the time difference between "stackTime" and the time the log is called
  private getElapsedTime(): string {
    const now = Date.now()
    const start = this.stackTime || Date.now()
    return ((now - start) / 1000).toFixed(4).padStart(10, "0")
  }

  // VER: Function to set id
  public sid(idNumber: number | string) {
    if (idNumber) {
      const idStr = idNumber.toString()
      // Pad the ID number with zeros to ensure a total length of 10 characters
      this.id = idStr.padStart(10, "x")
    }
    return this
  }

  public report(text: string) {
    this.logType = "report"
    this.logText = `[REPORT] ${text}`
    return this
  }

  public detail(text: string) {
    this.logType = "detail"
    this.logText = `[DETAIL] ${text}`
    return this
  }

  public alerts(text: string) {
    this.logType = "alerts"
    this.logText = `[ALERTS] ${text}`
    return this
  }

  public errors(text: string) {
    this.logType = "errors"
    this.logText = `[ERRORS] ${text}`
    return this
  }

  public log() {
    let consoleMessage: string = ""
    const elapsed: string = this.getElapsedTime()

    const formatMap = {
      id: () => `ID: ${chalk.yellow(`[${this.id}]`)} -> `,
      elapsed: () => `Elapsed: ${chalk.yellow(`[${elapsed}]`)} -> `,
      func: () => `fn: ${chalk.yellow(`[${this.func}]`)} -> `,
      stack: () => (this.stack ? `Stack: ${chalk.yellow(`[${this.stack}]`)} -> ` : "")
    }

    this.logOrder.forEach((key) => {
      consoleMessage += formatMap[key]?.() || ""
    })

    switch (this.logType) {
      case "detail":
        consoleMessage += chalk.blue(`${this.logText}`)
        break
      case "alerts":
        consoleMessage += chalk.hex("#FFA500")(`${this.logText}`)
        break
      case "errors":
        consoleMessage += chalk.red(`${this.logText}`)
        break
      case "report":
        consoleMessage += this.logText
        break
      default:
        consoleMessage += this.logText
        break
    }

    console.log(consoleMessage)
    return this
  }

  public async save(folder?: string | null, fileName?: string | null): Promise<TSaveOutput> {
    const dateFolder = new Date().toISOString().split("T")[0]
    const logFolder = this.folder || folder
    const directoryPath: string = logFolder
      ? path.join(this.root, dateFolder, logFolder)
      : path.join(this.root, dateFolder)

    // eslint-disable-next-line no-nested-ternary
    const jsonName = fileName ? `${fileName}.json` : (this.file ? `${this.file}.json` : "catch.json")

    fs.mkdirSync(directoryPath, { recursive: true })
    const filePath = path.join(directoryPath, jsonName)

    // Handle blank JSON file
    let existingData = []
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }))
    }

    const logData: TSaveOutput = <TSaveOutput>{}
    const valueMap = {
      id: this.id,
      created: new Date().toISOString(),
      elapsed: this.getElapsedTime(),
      func: this.func,
      stack: this.stack
    }

    this.saveOrder.forEach((key) => {
      // @ts-expect-error
      logData[key] = valueMap[key]
    })

    // These are always at the end and cannot be moved.
    logData.logType = this.logType

    // Assuming `this.logText` is in the format '[SOMETHING] text'
    if (this.logText) {
      logData.logText = this.logText.includes("]")
        ? this.logText.split("]")[1].trim() // Get the text after ']' and trim any leading/trailing spaces
        : this.logText // If no ']' is found, use the whole string
    }

    existingData.unshift(logData) // Insert at the beginning
    const jsonData = `[\n  ${existingData.map((item: string) => JSON.stringify(item)).join(",\n  ")}\n]`
    fs.writeFileSync(filePath, jsonData) // Write with custom formatting

    return logData
  }
}

// Application Component || Define Exports
// =================================================================================================
// =================================================================================================
export const script = Script.getInstance
export const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})
