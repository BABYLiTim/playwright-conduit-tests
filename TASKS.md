# Test Tasks - Conduit App

## Task 1.1 — User Login (Happy Path)
**Status**: In Progress

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

**File**: `tests/task_1-1.spec.ts`

---

## Additional Tasks
- [ ] Task 1.2 - Add more test cases as needed
- [ ] Task 1.3 - Add more test cases as needed

---

## Notes
- Conduit app base URL: Configure in `playwright.config.ts`
- Use Playwright's locator strategies for accessibility
