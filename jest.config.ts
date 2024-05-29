import type { JestConfigWithTsJest } from "ts-jest"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  rootDir: "./tests",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    // Regex pattern to include TypeScript and JavaScript files
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        // ts-jest specific configuration options
        useESM: true // Enabling ECMAScript Modules
      }
    ]
  }
}

// Export the configuration to be used by Jest
export default jestConfig
