import chalk from "chalk"
import fs from "fs"
import path from "path"

interface ScriptConfig {
  saveLocation: string;
  defaultLogLocation: string;
}

const defaultConfig: ScriptConfig = {
  saveLocation: "./mylogs",
  defaultLogLocation: "test" // Default log location if no ID is provided
}

class Script {
  private static instance: Script

  private sequenceStart: number | null = null

  private lastLogTime: number | null = null

  private config: ScriptConfig = defaultConfig

  private group: string | null = null

  private groupId: string | null = null

  private constructor() {}

  public static get getInstance(): Script {
    return this.instance || (this.instance = new this())
  }

  private getElapsedTime(): string {
    const now = Date.now()
    const start = this.lastLogTime || this.sequenceStart || now
    this.lastLogTime = now // Update last log time
    return ((now - start) / 1000).toFixed(4).padStart(9, "0")
  }

  private async saveLog(logData: { id?: string; loc?: string; text: string; type: string; elapsed: string }): Promise<void> {
    const dateFolder = new Date().toISOString().split("T")[0]
    const logFolder = logData.id ? logData.loc || this.config.defaultLogLocation : this.config.defaultLogLocation
    const directoryPath = path.join(this.config.saveLocation, dateFolder, logFolder)
    const fileName = logData.id ? `${logData.id.padStart(10, "0")}.json` : "catch.json"

    fs.mkdirSync(directoryPath, { recursive: true })
    const filePath = path.join(directoryPath, fileName)
    const logEntry = `${JSON.stringify(logData)}\n`
    fs.appendFileSync(filePath, logEntry)
  }

  private async log(data: { id?: string; loc?: string; text: string; type: string }): Promise<any> {
    const elapsed = this.getElapsedTime()
    let consoleMessage = `ID: [${data.id ? data.id.padStart(10, "0") : "0000000000"}] -> Elapsed: ${chalk.yellow(`[${elapsed}]`)} -> `

    if (this.group && this.groupId) {
      consoleMessage += `Group: [${this.group}(${this.groupId})] -> `
    }

    switch (data.type) {
      case "report": consoleMessage += chalk.green(`[${data.text}]`); break
      case "guide": consoleMessage += chalk.blue(`[${data.text}]`); break
      case "warns": consoleMessage += chalk.hex("#FFA500")(`[${data.text}]`); break // orange
      case "error": consoleMessage += chalk.red(`[${data.text}]`); break
      case "log": consoleMessage += chalk.green(`[SUCCESS] ${data.text}`); break
      default: consoleMessage += `[${data.text}]`
    }

    console.log(consoleMessage)
    await this.saveLog({ ...data, elapsed })
    return { ...data, elapsed }
  }

  public start(groupName: string): string {
    this.sequenceStart = Date.now()
    this.lastLogTime = null
    this.group = groupName
    this.groupId = Math.floor(1000 + Math.random() * 9000).toString() // Random 4-digit code
    return `${groupName}(${this.groupId})`
  }

  public groupLogger(): any {
    return {
      id: (id: string) => {
        this.log({ id, text: "Group Started", type: "group" })
        return this.groupLogger()
      },
      report: (text: string) => {
        return this.log({ text, type: "report" })
      },
      log: (text: string) => {
        return this.log({ text, type: "log" })
      },
      save: async (location: string) => {
        await this.saveLog({ loc: location, text: "Log saved", type: "save" })
        return this.groupLogger()
      }
    }
  }

  public finish(group: string): void {
    if (this.group === group.split("(")[0] && this.groupId === group.match(/\((.*?)\)/)[1]) {
      this.sequenceStart = null
      this.lastLogTime = null
      this.group = null
      this.groupId = null
    }
  }
}

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
export const script = Script.getInstance
