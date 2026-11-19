# SpendWise — Interactive Budget Tracker

## 1. Improvements Made to SpendWise This Week
This week, SpendWise was upgraded from a static layout into an interactive budgeting web application powered by JavaScript. Users can now set and update a monthly budget, add expense records with descriptions, amounts, and categories, filter expenses by category, delete individual items or clear all expenses, and view live budget calculations and status alerts directly on the dashboard.

## 2. How Conditionals Are Used
Conditional statements (`if / else if / else`) are used in `script.js` to make decisions based on budgeting data and user input:
- **Budget Health Evaluation (`evaluateBudgetStatus`):** Checks whether a budget has been set (`currentBudget <= 0`), whether spending has exceeded the budget (`currentSpent > currentBudget`), whether spending has reached 80% or more (`ratio >= 0.8`), or whether spending is comfortably within budget.
- **Remaining Balance Styling:** Changes the remaining balance text color to red when `remaining < 0` and green when non-negative.
- **Input Validation & Empty States:** Validates that budgets and expense amounts are positive numbers, ensures a non-empty description is entered, and displays a tailored empty-state message when no expenses match the active filter.

## 3. How Arrays Are Used to Store Data
Arrays organize structured data and filter options in `script.js`:
- **`expenses` array:** Stores multiple expense objects (each containing `id`, `title`, `amount`, `category`, and `date`) rather than separate variables for each entry.
- **`categories` array:** Holds the supported category names (`"All"`, `"Food"`, `"Transport"`, `"Bills"`, `"Entertainment"`, `"Other"`) for category validation.
- **Filtered/Updated Arrays (`visibleExpenses`, `updatedExpenses`):** Collect matching or remaining records when filtering by category or deleting an expense.

## 4. How Loops Process Data and How the DOM Is Updated
- **Loops:** `for...of` loops iterate through the `expenses` array to sum total spending (`calculateTotalSpent`), filter records by selected category, remove a deleted record by `id`, and build list items (`<li>`) for each visible expense.
- **DOM Manipulation:** `renderDashboard()` updates `#total-budget`, `#total-spent`, `#remaining-balance`, `#budget-status`, and `#expense-count` using `.textContent` and class/style updates, while dynamically creating and appending elements (`document.createElement`) inside `#expense-list`.

## 5. How User Interactions Are Handled Through Events
Event listeners (`addEventListener`) connect user actions on the page to JavaScript logic:
- **`budgetForm` (`submit`):** Captures the new budget value, prevents page reload with `event.preventDefault()`, updates `budget`, and refreshes the dashboard.
- **`expenseForm` (`submit`):** Validates inputs, creates a new expense object, pushes it to `expenses`, resets the form, and re-renders the UI.
- **`categoryFilterEl` (`change`):** Updates `activeCategory` whenever the user picks a category dropdown option and re-renders the filtered list.
- **`deleteBtn` (`click`) & `clearAllBtn` (`click`):** Removes a single expense by `id` or clears all stored expenses and updates the dashboard immediately.

## 6. Challenges Encountered and How They Were Resolved
- **Working from a Mobile Device Without Desktop VS Code:** Created and edited `index.html`, `style.css`, `script.js`, and `README.md` directly in the mobile browser on GitHub by using the repository's `...` menu to create new files and the edit icon to update existing files.
- **Keeping Data and UI Synchronized After Edits/Deletes:** Centralized all UI updates inside a single `renderDashboard()` function so adding, filtering, deleting, or clearing expenses always recalculates totals, re-evaluates budget status, and refreshes the DOM consistently.
