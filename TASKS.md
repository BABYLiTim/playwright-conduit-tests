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
**Status**: Done

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

## Task 2.1 — Login Page Object
**Status**: Done

### Description
Create a Login Page Object with the following methods:

```javascript
// login.page.ts
open()
login(email, password)
getErrorMessage()
```

### Rules
- ❌ No `expect()` inside Page Object
- ✅ Only actions & getters

### Acceptance Criteria
- [ ] Page Object created with all required methods
- [ ] No assertions inside Page Object
- [ ] Only interactions and getter methods
- [ ] Can be imported and used in tests

**File**: `tests/pages/login.page.ts`

---

## Task 2.2 — Home Page Object
**Status**: Done

### Description
Create a Home Page Object with the following methods:

```javascript
// home.page.ts
openNewArticle()
openUserProfile(username)
getArticleTitles()
```

### Rules
- ❌ No `expect()` inside Page Object
- ✅ Only actions & getters

### Acceptance Criteria
- [ ] Page Object created with all required methods
- [ ] No assertions inside Page Object
- [ ] Only interactions and getter methods
- [ ] Can be imported and used in tests

**File**: `tests/pages/home.page.ts`

---

## Task 2.3 — Rewrite UI Tests Using POM
**Status**: Done

### Scenario
Refactor existing tests to use Page Object Model:

1. Login test
2. Create article test

### Acceptance Criteria
- [ ] Tests look short and readable
- [ ] No selectors inside tests
- [ ] All selectors moved to page objects
- [ ] Tests use page object methods instead of direct interactions

**Files**:
- `tests/login.spec.ts`
- `tests/articles.spec.ts`

---

## Additional Tasks
- [ ] Add more test cases as needed

---

## Notes
- Conduit app base URL: Configure in `playwright.config.ts`
- Use Playwright's locator strategies for accessibility
