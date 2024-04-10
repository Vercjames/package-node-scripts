export type TLogOrder = ("id" | "elapsed" | "func" | "stack" | "type")[];
export type TSaveOrder = ("id" | "created" | "elapsed" | "func" | "stack" | "type")[];
export type TLogType = "default" | "success" | "warning" | "mistake" | "insight"
// Type for input configuration with optional properties
export type TConfigInput = {
  id?: string
  root?: string
  file?: string | null
  func?: string | null
  folder?: string | null
  logText?: string | null
  logOrder?: TLogOrder
  saveOrder?: TSaveOrder
  logType?: TLogType
}

// Type for output configuration where all properties are required
export type TConfigOutput = {
  id: string
  root: string
  file: string | null
  func: string | null
  stack: string | null
  stackTime: number | null
  folder: string | null
  logText: string | null
  logOrder: TLogOrder
  saveOrder: TSaveOrder
  logType: TLogType
}

// Type for output of the saved log
export type TSaveOutput = {
  id?: string
  created?: string
  elapsed?: string
  func?: string
  stack?: string
  logType: string
  logText: string | null
}

// Type for script.config.json
export type TConstructor = {
  root?: string
  logOrder?: TLogOrder
  saveOrder?: TSaveOrder
}
