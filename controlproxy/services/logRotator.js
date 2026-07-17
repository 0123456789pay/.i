const fs = require('fs');
const path = require('path');

module.exports = (config) => {
  const logConfig = config.logging;
  
  // Ensure log directory exists
  const logDir = path.dirname(logConfig.file);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Log rotation service
  setInterval(() => {
    rotateLogs();
  }, 60 * 60 * 1000); // Check every hour

  function rotateLogs() {
    try {
      if (!fs.existsSync(logConfig.file)) {
        return;
      }

      const stats = fs.statSync(logConfig.file);
      const fileSizeMB = stats.size / (1024 * 1024);

      if (fileSizeMB > logConfig.max_size_mb) {
        // Rotate logs
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedPath = `${logConfig.file}.${timestamp}`;
        
        fs.renameSync(logConfig.file, rotatedPath);
        console.log(`Log rotated to ${rotatedPath}`);

        // Clean up old logs
        cleanupOldLogs();
      }
    } catch (error) {
      console.error('Log rotation error:', error.message);
    }
  }

  function cleanupOldLogs() {
    try {
      const logDir = path.dirname(logConfig.file);
      const logFiles = fs.readdirSync(logDir)
        .filter(file => file.startsWith(path.basename(logConfig.file)))
        .sort()
        .reverse();

      // Keep only the specified number of rotated logs
      if (logFiles.length > logConfig.rotation_count) {
        const filesToDelete = logFiles.slice(logConfig.rotation_count);
        filesToDelete.forEach(file => {
          fs.unlinkSync(path.join(logDir, file));
          console.log(`Deleted old log: ${file}`);
        });
      }
    } catch (error) {
      console.error('Log cleanup error:', error.message);
    }
  }

  // Custom logger function
  function log(level, message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta
    };

    const logLine = JSON.stringify(entry) + '\n';
    
    // Write to file
    fs.appendFileSync(logConfig.file, logLine);
    
    // Also log to console based on level
    if (shouldLogToConsole(level)) {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](logLine.trim());
    }
  }

  function shouldLogToConsole(level) {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(config.logging.level);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex <= currentLevelIndex;
  }

  // Export logger methods
  return {
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta),
    debug: (message, meta) => log('debug', message, meta)
  };
};
