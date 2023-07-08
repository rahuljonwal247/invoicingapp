
// Global Variables
var invoiceItems = [];
var taxRate = 0.18; // Example tax rate
var recommendedItems = [
  { name: "Item 1", price: 10 },
  { name: "Item 2", price: 20 },
  { name: "Item 3", price: 30 }
];

// Login Screen
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform login validation
  if (validateLogin(username, password)) {
    // Login success
    hideElement("login-screen");
    showElement("dashboard");
  } else {
    // Login failed
    displayErrorMessage("Invalid username or password");
  }
}

function validateLogin(username, password) {
  // Add your login validation logic here
  // Return true if the login is successful, false otherwise
  return username === "admin" && password === "password";
}

// Dashboard
function showNewInvoiceForm() {
  hideElement("dashboard");
  showElement("new-invoice-form");
  showRecommendedItems();
}

// Create New Invoice
function addItem() {
  var itemName = document.getElementById("item-name").value;
  var quantity = document.getElementById("item-quantity").value;
  var unitPrice = document.getElementById("item-price").value;
  var discount = document.getElementById("item-discount").value;

  var subtotal = (quantity * unitPrice) - discount;
  invoiceItems.push({ itemName, quantity, unitPrice, discount, subtotal });

  calculateItemTotals();
  displayInvoiceItems();
  calculateNetTotal();

  clearInputFields("item-name", "item-quantity", "item-price", "item-discount");
}

function calculateItemTotals() {
  invoiceItems.forEach(function(item) {
    var subtotal = item.quantity * item.unitPrice;
    var taxAmount = subtotal * taxRate;
    var total = subtotal + taxAmount - item.discount;
    item.subtotal = subtotal;
    item.taxAmount = taxAmount;
    item.total = total;
  });
}

// Recommended Items
function showRecommendedItems() {
  var recommendationsContainer = document.getElementById("recommendations-container");
  recommendationsContainer.innerHTML = ""; // Clear previous recommendations

  recommendedItems.forEach(function(item) {
    var recommendation = document.createElement("div");
    recommendation.classList.add("recommendation");
    recommendation.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
      <button onclick="addRecommendedItem('${item.name}', ${item.price})">Add</button>
    `;
    recommendationsContainer.appendChild(recommendation);
  });
}

function addRecommendedItem(name, price) {
  document.getElementById("item-name").value = name;
  document.getElementById("item-price").value = price;

  addItem();
}

// Billing and Payment
function createInvoice(event) {
  event.preventDefault();

  var customerName = document.getElementById("customer-name").value;
  var invoiceDate = document.getElementById("invoice-date").value;

  // Perform invoice creation logic
  // You can send the invoice data to the server or handle it locally as per your requirements

  clearForm("invoice-form");
  invoiceItems = [];

  displayInvoiceItems();
  calculateNetTotal();

  showBillingPaymentPage();
}

function updatePaymentStatus() {
  var paymentStatus = document.getElementById("payment-status-select").value;
  // Perform payment status update logic
}

// Utility Functions
function clearInputFields(...ids) {
  ids.forEach(function(id) {
    document.getElementById(id).value = "";
  });
}

function clearForm(formId) {
  document.getElementById(formId).reset();
}

function displayErrorMessage(message) {
  document.getElementById("error-message").textContent = message;
}

function hideElement(elementId) {
  document.getElementById(elementId).style.display = "none";
}

function showElement(elementId) {
  document.getElementById(elementId).style.display = "block";
}

function displayInvoiceItems() {
  var invoiceItemsBody = document.getElementById("invoice-items-body");
  invoiceItemsBody.innerHTML = ""; // Clear previous items

  invoiceItems.forEach(function(item) {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.quantity}</td>
      <td>${item.unitPrice}</td>
      <td>${item.discount}</td>
      <td>${item.subtotal}</td>
      <td>${item.taxAmount}</td>
      <td>${item.total}</td>
    `;
    invoiceItemsBody.appendChild(row);
  });
}

function calculateNetTotal() {
  var netTotal = invoiceItems.reduce(function(total, item) {
    return total + item.total;
  }, 0);
  document.getElementById("net-total").value = netTotal;
}
