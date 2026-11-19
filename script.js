// 1. State & Arrays (Work with Multiple Records)
let budget = 0;
let expenses = [];
let activeCategory = "All";
const categories = ["All", "Food", "Transport", "Bills", "Entertainment", "Other"];

// DOM Element References
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const totalBudgetEl = document.getElementById("total-budget");
const totalSpentEl = document.getElementById("total-spent");
const remainingBalanceEl = document.getElementById("remaining-balance");
const budgetStatusEl = document.getElementById("budget-status");

const expenseForm = document.getElementById("expense-form");
const titleInput = document.getElementById("expense-title");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");

const categoryFilterEl = document.getElementById("category-filter");
const clearAllBtn = document.getElementById("clear-all-btn");
const expenseListEl = document.getElementById("expense-list");
const expenseCountEl = document.getElementById("expense-count");

// Helper: Format currency cleanly
function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}

// 2. Process Data with Loops: Calculate total spent across all expenses
function calculateTotalSpent(expenseArray) {
  let total = 0;
  for (const item of expenseArray) {
    total += item.amount;
  }
  return total;
}

// 3. Implement Decision Making: Evaluate budgeting scenario & return feedback
function evaluateBudgetStatus(currentBudget, currentSpent) {
  if (currentBudget <= 0) {
    return {
      className: "status-ok",
      message: "No budget set yet. Enter a monthly budget above to track your spending limits."
    };
  }

  const ratio = currentSpent / currentBudget;

  if (currentSpent > currentBudget) {
    const overspent = currentSpent - currentBudget;
    return {
      className: "status-over",
      message: `Over budget! You have exceeded your budget by ${formatMoney(overspent)}.`
    };
  } else if (ratio >= 0.8) {
    const left = currentBudget - currentSpent;
    return {
      className: "status-warn",
      message: `Warning: You have used ${Math.round(ratio * 100)}% of your budget (${formatMoney(left)} remaining).`
    };
  } else {
    const left = currentBudget - currentSpent;
    return {
      className: "status-ok",
      message: `On track! You are within budget with ${formatMoney(left)} remaining.`
    };
  }
}

// 4. Update the Dashboard Dynamically (DOM Manipulation)
function renderDashboard() {
  const totalSpent = calculateTotalSpent(expenses);
  const remaining = budget - totalSpent;

  totalBudgetEl.textContent = formatMoney(budget);
  totalSpentEl.textContent = formatMoney(totalSpent);
  remainingBalanceEl.textContent = formatMoney(remaining);

  // Conditional styling for remaining balance
  if (remaining < 0) {
    remainingBalanceEl.style.color = "#dc2626";
  } else {
    remainingBalanceEl.style.color = "#166534";
  }

  // Update budget status banner using conditional decision result
  const status = evaluateBudgetStatus(budget, totalSpent);
  budgetStatusEl.className = `status-banner ${status.className}`;
  budgetStatusEl.textContent = status.message;

  // Filter expenses using a loop and conditional check
  const visibleExpenses = [];
  for (const expense of expenses) {
    if (activeCategory === "All" || expense.category === activeCategory) {
      visibleExpenses.push(expense);
    }
  }

  expenseCountEl.textContent = visibleExpenses.length;
  expenseListEl.innerHTML = "";

  // Conditional check for empty list
  if (visibleExpenses.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "empty-state";
    emptyLi.textContent =
      activeCategory === "All"
        ? "No expenses recorded yet. Add one above!"
        : `No expenses found in the "${activeCategory}" category.`;
    expenseListEl.appendChild(emptyLi);
    return;
  }

  // Loop through visible expenses and create DOM elements
  for (const expense of visibleExpenses) {
    const li = document.createElement("li");
    li.className = "expense-item";

    const infoDiv = document.createElement("div");
    infoDiv.className = "expense-info";

    const titleSpan = document.createElement("span");
    titleSpan.className = "expense-title";
    titleSpan.textContent = expense.title;

    const metaDiv = document.createElement("div

