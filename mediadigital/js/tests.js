/**
 * Unit Tests for Media Digital Platform
 * Run with: node tests.js (requires Node.js) or include in HTML for browser testing
 */

// Mock localStorage for Node.js environment
if (typeof window === 'undefined') {
    global.localStorage = {
        store: {},
        getItem(key) { return this.store[key] || null; },
        setItem(key, value) { this.store[key] = String(value); },
        removeItem(key) { delete this.store[key]; },
        clear() { this.store = {}; }
    };
}

// Test results tracking
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

// Test assertion helper
function assert(condition, testName, expected, actual) {
    if (condition) {
        testResults.passed++;
        testResults.tests.push({ name: testName, status: 'PASS' });
        console.log(`✅ PASS: ${testName}`);
    } else {
        testResults.failed++;
        testResults.tests.push({ 
            name: testName, 
            status: 'FAIL', 
            expected, 
            actual 
        });
        console.error(`❌ FAIL: ${testName}`);
        console.error(`   Expected: ${expected}`);
        console.error(`   Actual: ${actual}`);
    }
}

// ============================================
// TEST SUITE: Sanitizer
// ============================================
console.log('\n=== Running Sanitizer Tests ===\n');

if (typeof Sanitizer !== 'undefined') {
    // Test 1: Basic sanitization
    const input1 = '<script>alert("xss")</script>Hello';
    const result1 = Sanitizer.sanitize(input1);
    assert(
        !result1.includes('<script>') && result1.includes('Hello'),
        'Sanitizer removes script tags',
        'No script tags',
        result1
    );

    // Test 2: HTML entity encoding
    const input2 = '<div onclick="evil()">Click</div>';
    const result2 = Sanitizer.sanitize(input2);
    assert(
        !result2.includes('<div>') && !result2.includes('>'),
        'Sanitizer encodes HTML entities',
        'Encoded HTML',
        result2
    );

    // Test 3: JavaScript protocol removal
    const input3 = 'javascript:alert(1)';
    const result3 = Sanitizer.sanitize(input3);
    assert(
        !result3.toLowerCase().includes('javascript:'),
        'Sanitizer removes javascript: protocol',
        'No javascript protocol',
        result3
    );

    // Test 4: Object sanitization
    const objInput = { name: '<b>John</b>', age: 25 };
    const objResult = Sanitizer.sanitizeObject(objInput);
    assert(
        objResult.name === '&lt;b&gt;John&lt;/b&gt;' && objResult.age === 25,
        'Sanitizer.sanitizeObject handles mixed types',
        '{name: "&lt;b&gt;John&lt;/b&gt;", age: 25}',
        JSON.stringify(objResult)
    );

    // Test 5: Null/undefined handling
    assert(
        Sanitizer.sanitize(null) === '' && Sanitizer.sanitize(undefined) === '',
        'Sanitizer handles null/undefined',
        'Empty string',
        `null->"${Sanitizer.sanitize(null)}", undefined->"${Sanitizer.sanitize(undefined)}"`
    );
} else {
    console.warn('⚠️ Sanitizer module not loaded - skipping tests');
}

// ============================================
// TEST SUITE: Validator
// ============================================
console.log('\n=== Running Validator Tests ===\n');

if (typeof Validator !== 'undefined') {
    // Test 6: Valid email
    assert(
        Validator.isValidEmail('test@example.com') === true,
        'Validator accepts valid email',
        'true',
        Validator.isValidEmail('test@example.com')
    );

    // Test 7: Invalid email - no @
    assert(
        Validator.isValidEmail('invalid.email') === false,
        'Validator rejects email without @',
        'false',
        Validator.isValidEmail('invalid.email')
    );

    // Test 8: Invalid email - no domain
    assert(
        Validator.isValidEmail('test@') === false,
        'Validator rejects email without domain',
        'false',
        Validator.isValidEmail('test@')
    );

    // Test 9: Empty email
    assert(
        Validator.isValidEmail('') === false,
        'Validator rejects empty email',
        'false',
        Validator.isValidEmail('')
    );

    // Test 10: Valid password
    const passResult = Validator.isValidPassword('SecurePass123');
    assert(
        passResult.valid === true && passResult.errors.length === 0,
        'Validator accepts strong password',
        'valid: true',
        JSON.stringify(passResult)
    );

    // Test 11: Weak password - too short
    const weakPass = Validator.isValidPassword('Ab1');
    assert(
        weakPass.valid === false,
        'Validator rejects short password',
        'valid: false',
        JSON.stringify(weakPass)
    );

    // Test 12: Password without number
    const noNumPass = Validator.isValidPassword('NoNumbers');
    assert(
        noNumPass.valid === false && noNumPass.errors.some(e => e.includes('angka')),
        'Validator requires numbers in password',
        'Error about numbers',
        JSON.stringify(noNumPass.errors)
    );

    // Test 13: Required fields validation
    const requiredTest = Validator.validateRequired({ name: 'John', email: '', age: 0 });
    assert(
        requiredTest.valid === false && requiredTest.missingFields.includes('email'),
        'Validator detects missing required fields',
        'missingFields includes "email"',
        JSON.stringify(requiredTest)
    );

    // Test 14: All required fields present
    const allPresent = Validator.validateRequired({ name: 'John', email: 'j@test.com' });
    assert(
        allPresent.valid === true && allPresent.missingFields.length === 0,
        'Validator passes when all fields present',
        'valid: true',
        JSON.stringify(allPresent)
    );
} else {
    console.warn('⚠️ Validator module not loaded - skipping tests');
}

// ============================================
// TEST SUITE: SessionManager
// ============================================
console.log('\n=== Running SessionManager Tests ===\n');

if (typeof SessionManager !== 'undefined') {
    // Clear localStorage before tests
    localStorage.clear();

    // Test 15: Start session
    SessionManager.startSession();
    const sessionStart = SessionManager.getSessionStart();
    assert(
        sessionStart !== null && typeof sessionStart === 'number',
        'SessionManager.startSession sets timestamp',
        'Number timestamp',
        sessionStart
    );

    // Test 16: Session not expired immediately
    assert(
        SessionManager.isSessionExpired() === false,
        'New session is not expired',
        'false',
        SessionManager.isSessionExpired()
    );

    // Test 17: Refresh session
    const oldTimestamp = SessionManager.getSessionStart();
    SessionManager.refreshSession();
    const newTimestamp = SessionManager.getSessionStart();
    assert(
        newTimestamp >= oldTimestamp,
        'SessionManager.refreshSession updates timestamp',
        'New timestamp >= old',
        `${oldTimestamp} -> ${newTimestamp}`
    );

    // Test 18: End session
    SessionManager.endSession();
    assert(
        SessionManager.getSessionStart() === null,
        'SessionManager.endSession clears timestamp',
        'null',
        SessionManager.getSessionStart()
    );

    // Test 19: Expired session detection (mock time)
    localStorage.setItem('sessionStart', (Date.now() - 31 * 60 * 1000).toString()); // 31 minutes ago
    assert(
        SessionManager.isSessionExpired() === true,
        'SessionManager detects expired session (>30 min)',
        'true',
        SessionManager.isSessionExpired()
    );
} else {
    console.warn('⚠️ SessionManager module not loaded - skipping tests');
}

// ============================================
// TEST SUITE: CSRFManager
// ============================================
console.log('\n=== Running CSRFManager Tests ===\n');

if (typeof CSRFManager !== 'undefined') {
    localStorage.clear();

    // Test 20: Generate token
    const token1 = CSRFManager.generateToken();
    assert(
        typeof token1 === 'string' && token1.length > 32,
        'CSRFManager generates long random token',
        'String length > 32',
        `${token1.length} chars`
    );

    // Test 21: Get token creates if not exists
    localStorage.clear();
    const token2 = CSRFManager.getToken();
    assert(
        typeof token2 === 'string' && token2.length > 0,
        'CSRFManager.getToken creates token if missing',
        'Non-empty string',
        token2
    );

    // Test 22: Token persistence
    const token3 = CSRFManager.getToken();
    assert(
        token2 === token3,
        'CSRFManager.getToken returns same token',
        'Same token',
        `${token2} === ${token3}`
    );

    // Test 23: Validate token
    assert(
        CSRFManager.validateToken(token2) === true,
        'CSRFManager validates correct token',
        'true',
        CSRFManager.validateToken(token2)
    );

    // Test 24: Reject invalid token
    assert(
        CSRFManager.validateToken('invalid-token') === false,
        'CSRFManager rejects invalid token',
        'false',
        CSRFManager.validateToken('invalid-token')
    );
} else {
    console.warn('⚠️ CSRFManager module not loaded - skipping tests');
}

// ============================================
// TEST SUITE: Utility Functions
// ============================================
console.log('\n=== Running Utility Function Tests ===\n');

// Test 25: simpleHash consistency
if (typeof simpleHash !== 'undefined') {
    const hash1 = simpleHash('password123');
    const hash2 = simpleHash('password123');
    assert(
        hash1 === hash2,
        'simpleHash produces consistent output',
        hash1,
        hash2
    );

    // Test 26: Different inputs produce different hashes
    const hash3 = simpleHash('password456');
    assert(
        hash1 !== hash3,
        'simpleHash produces different output for different inputs',
        'Different hashes',
        `${hash1} vs ${hash3}`
    );
} else {
    console.warn('⚠️ simpleHash function not loaded - skipping tests');
}

// Test 27: debounce execution
if (typeof debounce !== 'undefined') {
    let callCount = 0;
    const debouncedFn = debounce(() => callCount++, 50);
    
    // Call multiple times rapidly
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    assert(
        callCount === 0,
        'debounce delays execution',
        '0 calls immediately',
        callCount
    );
    
    // Wait for debounce to complete
    setTimeout(() => {
        assert(
            callCount === 1,
            'debounce executes once after delay',
            '1 call after delay',
            callCount
        );
        printTestSummary();
    }, 100);
} else {
    console.warn('⚠️ debounce function not loaded - skipping tests');
    printTestSummary();
}

// Print test summary
function printTestSummary() {
    console.log('\n========================================');
    console.log('           TEST SUMMARY');
    console.log('========================================');
    console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log('========================================\n');
    
    if (testResults.failed > 0) {
        console.log('Failed Tests Details:');
        testResults.tests
            .filter(t => t.status === 'FAIL')
            .forEach(t => {
                console.log(`  - ${t.name}`);
                console.log(`    Expected: ${t.expected}`);
                console.log(`    Actual: ${t.actual}\n`);
            });
    } else {
        console.log('🎉 All tests passed!');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testResults, assert };
}
