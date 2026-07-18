/``
 ` Component Middleware for SoutheastApp
 ` Middleware untuk validasi dan transformasi komponen
 `/

import { componentPattern } from '../components/index.js';

export class ComponentMiddleware {
  // Validate component name pattern
  static validateName(req, res, next) {
    const { name } = req.params;
    if (name && !componentPattern.validate(name)) {
      return res.status(400).json({
        error: 'Invalid component name pattern',
        message: 'Component names must have 1st and 5th character uppercase',
        expected: componentPattern.transform(name)
      });
    }
    next();
  }

  // Transform component name automatically
  static transformName(req, res, next) {
    const { name } = req.params;
    if (name) {
      req.transformedName = componentPattern.transform(name);
    }
    next();
  }

  // Log component operations
  static logOperation(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
  }
}

export default ComponentMiddleware;
