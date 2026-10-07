/**
 * Unit ujian untuk media digital landasan
 * jalankan dengan: node ujian.js (requires Node.js) atau include in HTML untuk browser testing
 */

// Mock localStorage untuk Node.js environment
if (typeof window === 'undefined') {
    global.localStorage = {
        store: {},
        getItem(key) { return this.store[key] || null; },
        setItem(key, value) { this.store[key] = String(value); },
        removeItem(key) { delete this.store[key]; },
        clear() { this.store = {}; }
    };
}

// uji results tracking
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

// uji assertion helper
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
// uji SUITE: Sanitizer
// ============================================
console.log('\n=== Running Sanitizer Tests ===\n');

if (typeof Sanitizer !== 'undefined') {
    // uji 1: Basic sanitization
    const input1 = '<script>alert("xss")</script>Hello';
    const result1 = Sanitizer.sanitize(input1);
    assert(
        !result1.includes('<script>') && result1.includes('Hello'),
        'Sanitizer removes script tags',
        'No script tags',
        result1
    );

    // uji 2: HTML entity encoding
    const input2 = '<div onclick="evil()">Click</div>';
    const result2 = Sanitizer.sanitize(input2);
    assert(
        !result2.includes('<div>') && !result2.includes('>'),
        'Sanitizer encodes HTML entities',
        'Encoded HTML',
        result2
    );

    // uji 3: skrip-skrip-javascript protocol removal
    const input3 = 'javascript:alert(1)';
    const result3 = Sanitizer.sanitize(input3);
    assert(
        !result3.toLowerCase().includes('javascript:'),
        'Sanitizer removes javascript: protocol',
        'No javascript protocol',
        result3
    );

    // uji 4: Object sanitization
    const objInput = { name: '<b>John</b>', age: 25 };
    const objResult = Sanitizer.sanitizeObject(objInput);
    assert(
        objResult.name === '&lt;b&gt;John&lt;/b&gt;' && objResult.age === 25,
        'Sanitizer.sanitizeObject handles mixed types',
        '{name: "&lt;b&gt;John&lt;/b&gt;", age: 25}',
        JSON.stringify(objResult)
    );

    // uji 5: Null/undefined handling
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
// uji SUITE: Validator
// ============================================
console.log('\n=== Running Validator Tests ===\n');

if (typeof Validator !== 'undefined') {
    // uji 6: Valid sur-el
    assert(
        Validator.isValidEmail('test@example.com') === true,
        'Validator accepts valid email',
        'true',
        Validator.isValidEmail('test@example.com')
    );

    // uji 7: Invalid sur-el - no @
    assert(
        Validator.isValidEmail('invalid.email') === false,
        'Validator rejects email without @',
        'false',
        Validator.isValidEmail('invalid.email')
    );

    // uji 8: Invalid sur-el - no domain
    assert(
        Validator.isValidEmail('test@') === false,
        'Validator rejects email without domain',
        'false',
        Validator.isValidEmail('test@')
    );

    // uji 9: Empty sur-el
    assert(
        Validator.isValidEmail('') === false,
        'Validator rejects empty email',
        'false',
        Validator.isValidEmail('')
    );

    // uji 10: Valid sandian
    const passResult = Validator.isValidPassword('SecurePass123');
    assert(
        passResult.valid === true && passResult.errors.length === 0,
        'Validator accepts strong password',
        'valid: true',
        JSON.stringify(passResult)
    );

    // uji 11: Weak sandian - too short
    const weakPass = Validator.isValidPassword('Ab1');
    assert(
        weakPass.valid === false,
        'Validator rejects short password',
        'valid: false',
        JSON.stringify(weakPass)
    );

    // uji 12: sandian without angka
    const noNumPass = Validator.isValidPassword('NoNumbers');
    assert(
        noNumPass.valid === false && noNumPass.errors.some(e => e.includes('angka')),
        'Validator requires numbers in password',
        'Error about numbers',
        JSON.stringify(noNumPass.errors)
    );

    // uji 13: Required fields validation
    const requiredTest = Validator.validateRequired({ name: 'John', email: '', age: 0 });
    assert(
        requiredTest.valid === false && requiredTest.missingFields.includes('email'),
        'Validator detects missing required fields',
        'missingFields includes "email"',
        JSON.stringify(requiredTest)
    );

    // uji 14: semua required fields present
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
// uji SUITE: SessionManager
// ============================================
console.log('\n=== Running SessionManager Tests ===\n');

if (typeof SessionManager !== 'undefined') {
    // Clear localStorage before ujian
    localStorage.clear();

    // uji 15: mulai sesi
    SessionManager.startSession();
    const sessionStart = SessionManager.getSessionStart();
    assert(
        sessionStart !== null && typeof sessionStart === 'number',
        'SessionManager.startSession sets timestamp',
        'Number timestamp',
        sessionStart
    );

    // uji 16: sesi bukan expired immediately
    assert(
        SessionManager.isSessionExpired() === false,
        'New session is not expired',
        'false',
        SessionManager.isSessionExpired()
    );

    // uji 17: Refresh sesi
    const oldTimestamp = SessionManager.getSessionStart();
    SessionManager.refreshSession();
    const newTimestamp = SessionManager.getSessionStart();
    assert(
        newTimestamp >= oldTimestamp,
        'SessionManager.refreshSession updates timestamp',
        'New timestamp >= old',
        `${oldTimestamp} -> ${newTimestamp}`
    );

    // uji 18: End sesi
    SessionManager.endSession();
    assert(
        SessionManager.getSessionStart() === null,
        'SessionManager.endSession clears timestamp',
        'null',
        SessionManager.getSessionStart()
    );

    // uji 19: Expired sesi detection (mock waktu)
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
// uji SUITE: CSRFManager
// ============================================
console.log('\n=== Running CSRFManager Tests ===\n');

if (typeof CSRFManager !== 'undefined') {
    localStorage.clear();

    // uji 20: hasilkan token
    const token1 = CSRFManager.generateToken();
    assert(
        typeof token1 === 'string' && token1.length > 32,
        'CSRFManager generates long random token',
        'String length > 32',
        `${token1.length} chars`
    );

    // uji 21: Get token creates if bukan exists
    localStorage.clear();
    const token2 = CSRFManager.getToken();
    assert(
        typeof token2 === 'string' && token2.length > 0,
        'CSRFManager.getToken creates token if missing',
        'Non-empty string',
        token2
    );

    // uji 22: Token persistence
    const token3 = CSRFManager.getToken();
    assert(
        token2 === token3,
        'CSRFManager.getToken returns same token',
        'Same token',
        `${token2} === ${token3}`
    );

    // uji 23: sahkan token
    assert(
        CSRFManager.validateToken(token2) === true,
        'CSRFManager validates correct token',
        'true',
        CSRFManager.validateToken(token2)
    );

    // uji 24: Reject invalid token
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
// uji SUITE: Utility Functions
// ============================================
console.log('\n=== Running Utility Function Tests ===\n');

// uji 25: simpleHash consistency
if (typeof simpleHash !== 'undefined') {
    const hash1 = simpleHash('password123');
    const hash2 = simpleHash('password123');
    assert(
        hash1 === hash2,
        'simpleHash produces consistent output',
        hash1,
        hash2
    );

    // uji 26: Different inputs produce different hashes
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

// uji 27: debounce execution
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
    
    // tunggu untuk debounce to complete
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

// Print uji summary
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

// Export untuk module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testResults, assert };
}
