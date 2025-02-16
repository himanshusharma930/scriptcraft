export const DEBUG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug'
}

class DebugLogger {
  constructor() {
    this.isDebugMode = process.env.NODE_ENV === 'development'
    this.logs = []
  }

  log(level, category, message, data = null) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      category,
      message,
      data
    }

    this.logs.push(logEntry)

    if (this.isDebugMode) {
      const logStyle = this.getLogStyle(level)
      console.group(`%c${category} | ${timestamp}`, logStyle)
      console.log(message)
      if (data) console.log('Data:', data)
      console.groupEnd()
    }
  }

  getLogStyle(level) {
    switch (level) {
      case DEBUG_LEVELS.ERROR:
        return 'color: #ff4444; font-weight: bold;'
      case DEBUG_LEVELS.WARN:
        return 'color: #ffbb33; font-weight: bold;'
      case DEBUG_LEVELS.INFO:
        return 'color: #33b5e5; font-weight: bold;'
      default:
        return 'color: #888;'
    }
  }

  getLogs() {
    return this.logs
  }

  clear() {
    this.logs = []
  }
}

export const debugLogger = new DebugLogger()