# JavaScript Modules - Media Digital Platform

## File Structure

```
js/
├── config.js           # Environment configuration (create from config.example.js)
├── config.example.js   # Configuration template
├── utils.js            # Security & utility functions
├── main.js             # Authentication & main application logic
├── repo-manager.js     # GitHub API integration
└── tests.js            # Unit tests
```

## Loading Order

Include scripts in this order in your HTML files:

```html
<!-- 1. Configuration (required first) -->
<script src="js/config.js"></script>

<!-- 2. Utility functions (provides Sanitizer, Validator, SessionManager, etc.) -->
<script src="js/utils.js"></script>

<!-- 3. Main application logic -->
<script src="js/main.js"></script>

<!-- 4. Repository manager (for dashboard only) -->
<script src="js/repo-manager.js"></script>

<!-- 5. Tests (development/testing only) -->
<!-- <script src="js/tests.js"></script> -->
```

## Module Descriptions

### config.js
- Environment-specific settings
- Security configurations
- API endpoints
- Validation patterns
- Error messages

**Important**: Copy `config.example.js` to `config.js` and customize for your environment.

### utils.js
Provides essential security and utility functions:

- **Sanitizer**: Input sanitization for XSS prevention
- **Validator**: Email, password, and form validation
- **SessionManager**: Session timeout and management
- **CSRFManager**: CSRF token generation and validation
- **simpleHash**: Basic password hashing (demo only)
- **debounce/throttle**: Performance optimization utilities

### main.js
Core application functionality:

- Login/Register form handling
- Authentication state management
- User interface updates
- Contact form processing
- Animation on scroll
- Global error handling

### repo-manager.js
GitHub API integration:

- Fetch repositories with caching
- Rate limit handling
- Admin authentication check
- Repository rendering with sanitization
- Auto-refresh functionality

### tests.js
Unit test suite:

- 27 tests covering all critical functions
- Run in browser or Node.js
- Test results displayed in console

## Usage Examples

### Input Sanitization
```javascript
// Sanitize user input before displaying
const safeName = Sanitizer.sanitize(userInput);
document.getElementById('display').textContent = safeName;

// Sanitize object properties
const safeUser = Sanitizer.sanitizeObject({ name: '<b>John</b>', age: 25 });
// Result: { name: '&lt;b&gt;John&lt;/b&gt;', age: 25 }
```

### Validation
```javascript
// Validate email
if (!Validator.isValidEmail(email)) {
    alert('Invalid email format');
}

// Validate password strength
const result = Validator.isValidPassword(password);
if (!result.valid) {
    alert(result.errors.join('\n'));
}

// Check required fields
const validation = Validator.validateRequired({ name, email, password });
if (!validation.valid) {
    alert(`Missing: ${validation.missingFields.join(', ')}`);
}
```

### Session Management
```javascript
// Start session after login
SessionManager.startSession();

// Check if session is valid
if (!SessionManager.checkSession()) {
    // Redirect to login
    window.location.href = 'login.html';
}

// Setup automatic session checking (call once on page load)
SessionManager.setupAutoCheck();
```

### CSRF Protection
```javascript
// Get CSRF token for forms
const token = CSRFManager.getToken();

// Add to form
document.getElementById('csrfToken').value = token;

// Validate on submission
if (!CSRFManager.validateToken(submittedToken)) {
    alert('Invalid CSRF token');
}
```

## Configuration

Edit `config.js` to customize:

```javascript
APP_CONFIG = {
    SECURITY: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        PASSWORD_MIN_LENGTH: 8,
        MAX_LOGIN_ATTEMPTS: 5
    },
    GITHUB: {
        USERNAME: 'jenisprotokol',
        CACHE_DURATION: 5 * 60 * 1000
    }
    // ... more settings
}
```

## Testing

### Browser Testing
```html
<script src="js/config.js"></script>
<script src="js/utils.js"></script>
<script src="js/tests.js"></script>
<!-- Check browser console for results -->
```

### Node.js Testing
```bash
node js/tests.js
```

## Security Best Practices

1. **Always sanitize output**: Use `Sanitizer.sanitize()` before displaying any user input
2. **Validate on client and server**: Client-side validation improves UX but never trust it for security
3. **Use HTTPS**: Always serve over HTTPS in production
4. **Session timeout**: Sessions expire after 30 minutes of inactivity
5. **CSRF protection**: Include CSRF tokens in all state-changing requests
6. **Password hashing**: Use bcrypt/argon2 in production (simpleHash is demo only)

## Troubleshooting

### Common Issues

**"Sanitizer is not defined"**
- Ensure `utils.js` is loaded after `config.js`

**"Session expired immediately"**
- Check system clock synchronization
- Verify localStorage is enabled in browser

**"GitHub API rate limit"**
- Wait 5 minutes for cache to refresh
- Reduce auto-refresh interval in config

**Tests failing**
- Clear localStorage before running tests
- Ensure all scripts are loaded in correct order

## Version History

- **v2.0.0** (Current)
  - Added comprehensive security features
  - Implemented session management
  - Added unit tests
  - Enhanced error handling
  - GitHub API caching

## License

Proprietary - Media Digital Platform
