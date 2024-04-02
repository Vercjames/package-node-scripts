import fs from "fs"
import path from "path"

export type TScriptingConfig = {
  root?: string | null
  group?: string | null
  folder?: string | null
  logOrder?: Array<"id" | "elapsed" | "group">
  saveOrder?: Array<"id" | "elapsed" | "group">
}

export class Script {
  private _id: string

  private _report: string

  private _group: string | null

  private _startTime: Date

  private _groupCode: number

  private config: TScriptingConfig

  private static instance: Script = new Script()

  constructor(config: TScriptingConfig) {
    this._id = "0000000000"
    this._report = ""
    this._startTime = new Date()
    this._group = null
    this._groupCode = Math.floor(1000 + Math.random() * 9000)
    this.config = {
      root: "mylogs",
      group: config.group || null,
      folder: config.folder || null,
      logOrder: config.logOrder || ["id", "elapsed", "group"],
      saveOrder: config.saveOrder || ["id", "elapsed", "group"]
    }
  }

  public start({ group, folder }): { group?: string, folder?: string } {
    return { group, groupCode: this._groupCode, folder }
  }

  // public start(name?: string): LogGroup {
  //   return new LogGroup(groupName);
  // }

  // public log(logGroup: LogGroup, id: string, folder: string, type: string, text: string, save: boolean): any {
  //   const message = this.formatLogMessage(id, logGroup.getGroup(), type, text)
  //   console.log(message)
  //
  //   if (save) {
  //     this.saveLog({ id, folder, type, text, group: logGroup.getGroup() })
  //   }
  //
  //   // Return log data for potential use
  //   return { id, folder, type, text, group: logGroup.getGroup() }
  // }
  //
  // private formatLogMessage(id: string, group: string, type: string, text: string): string {
  //   return `ID: ${chalk.yellow(`[${id.padStart(10, "0")}]`)} -> Group: ${chalk.yellow(`[${group}]`)} -> ${this.getMessageTypeStyle(type)}[${type.toUpperCase()}] ${text}`
  // }
  //
  public reports(text: string): any {
    return this.script.log(this.group, this.id, this.folder, "reports", text, this.saveFlag)
  }
  //
  // success(text: string): any {
  //   return this.script.log(this.group, this.id, this.folder, "success", text, this.saveFlag)
  // }
  //
  // details(text: string): any {
  //   return this.script.log(this.group, this.id, this.folder, "details", text, this.saveFlag)
  // }
  //
  // warning(text: string): any {
  //   return this.script.log(this.group, this.id, this.folder, "warning", text, this.saveFlag)
  // }
  //
  // mistake(text: string): any {
  //   return this.script.log(this.group, this.id, this.folder, "mistake", text, this.saveFlag)
  // }

  // start(groupName?: string) {
  //   this._eventGroup = groupName || "unspecified"
  //   this.randomCode = Math.floor(1000 + Math.random() * 9000)
  //   return this
  // }
  //
  // group(evt: string) {
  //   if (evt) {
  //     this._eventGroup = `${evt}(${this.randomCode})`
  //   }
  //   return this
  // }
  //
  // id(id: string) {
  //   this._id = id.padStart(10, "0")
  //   return this
  // }
  //
  // report(report: string) {
  //   this._report = report
  //   return this
  // }
  //
  // log(type: string) {
  //   const logMessage = `ID: [${this.id}] -> Elapsed: [${new Date().getTime() - this.startTime.getTime()}ms] -> Group: [${this._eventGroup}] -> [${type.toUpperCase()}] ${this.report}`
  //   console.log(logMessage)
  //   return this
  // }

  async save(folder: string) {
    const date = new Date().toISOString().split("T")[0]
    const dir = path.join(this.config.root, date, folder)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const filePath = path.join(dir, `${this.id}.json`)
    const data = JSON.stringify({
      id: this.id,
      createdAt: this.startTime.toISOString(),
      elapsed: new Date().getTime() - this.startTime.getTime(),
      group: this._eventGroup,
      report: this.report
    }, null, 2)
    await fs.promises.writeFile(filePath, data)
    return this
  }

  finish() {
    // Finalize or clean up if needed
  }
}
