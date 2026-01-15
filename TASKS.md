# Test Tasks - Conduit App

## Task 1.1 — User Login (Happy Path)
**Status**: Done

### Scenario
1. Open Conduit app
2. Click Sign in
3. Login with valid credentials
4. Verify:
   - User is redirected to Home page
   - Username is visible in the top navbar

### Acceptance Criteria
- [ ] No waitForTimeout
- [ ] Use expect() assertions
- [ ] Use role/text-based locators

**File**: `tests/login.spec.ts`

---

## Task 1.2 — Invalid Login (Negative Case)
**Status**: Done

### Scenario
1. Open Conduit app
2. Click Sign in
3. Login with invalid email/password
4. Verify error message is shown

### Acceptance Criteria
- [ ] Assert error text is displayed
- [ ] Test must fail if error is not displayed
- [ ] Use expect() assertions
- [ ] Use role/text-based locators

**File**: `tests/login.spec.ts`

---

## Task 1.3 — Create New Article
**Status**: Done

### Scenario
1. Login
2. Click New Article
3. Fill:
   - Title
   - Description
   - Body
   - Tags
4. Publish article
5. Verify:
   - Article page is opened
   - Title matches

### Acceptance Criteria
- [ ] Article is created successfully
- [ ] Article title matches input
- [ ] Use expect() assertions
- [ ] Use role/text-based locators
- [ ] No waitForTimeout

**File**: `tests/articles.spec.ts`

---

## Task 1.4 — Delete Article
**Status**: In Progress

### Scenario
1. Open your own article
2. Click Delete Article
3. Verify article no longer exists

### Acceptance Criteria
- [ ] Article is deleted successfully
- [ ] Use URL assertion or homepage article list
- [ ] Use expect() assertions
- [ ] Use role/text-based locators

**File**: `tests/task_1-4.spec.ts`

---

## Additional Tasks
- [ ] Add more test cases as needed

---

## Notes
- Conduit app base URL: Configure in `playwright.config.ts`
- Use Playwright's locator strategies for accessibility
