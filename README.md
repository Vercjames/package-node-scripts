Given your updated context, I'll revise the README to reflect the installation process through `npm` and clarify the dependency management, including whether users need to install `chalk` separately. If `chalk` is a dependency of `node-scripts` and is properly listed in its `package.json`, users typically won't need to install it separately. It will be installed automatically with your package.

---

# Node Scripts Logging Utility

Node Scripts Logging Utility is a comprehensive logging module for Node.js applications, providing advanced functionalities to capture, format, and save log data effectively.

## Features

- **Customizable Logging**: Supports various log types, including reports, details, alerts, and errors.
- **Configurable Log and Save Order**: Customize the order of properties in log output and saved files.
- **Dynamic Log Formatting**: Utilizes `chalk` for enhanced, colored console outputs.
- **Persistent File Logging**: Option to save logs to structured JSON files.
- **Elapsed Time Calculation**: Automatically tracks and displays elapsed time for log entries.

## Installation

Install the package via npm:

```bash
npm install node-scripts
```

This will also install necessary dependencies, including `chalk`.

## Usage

### Importing the Module

Import the `scripts` module in your project:

```javascript
import { scripts } from 'node-scripts';
```

### Configuration

Create a `script.config.json` file in your project's root directory to customize default settings:

```json
{
  "root": "customlogspath",
  "logOrder": ["id", "elapsed", "func", "stack"],
  "saveOrder": ["id", "created", "elapsed", "func", "stack"]
}
```

### Basic Logging

Example of logging various messages:

```javascript
scripts.start({ func: 'myFunction' })
  .report('Starting the process')
  .detail('Detailed information')
  .alerts('An alert message')
  .errors('Error encountered')
  .log();
```

### Saving Logs

To save logs to a file:

```javascript
scripts.save('optionalDirectoryName');
```

## Advanced Usage

Refer to the extensive documentation provided with the package for advanced features and detailed usage instructions.

## Contributing

We welcome contributions! Please submit pull requests for improvements or bug fixes to the `node-scripts` package. Follow the existing code structure and document new features for clarity.

---

Note: Make sure to adjust any specific instructions or package details based on how `node-scripts` is actually used and configured. The README should accurately reflect your package's capabilities and requirements.
