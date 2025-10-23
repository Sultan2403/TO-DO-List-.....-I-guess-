//Basic stuff....

// DOM Objects......
const displayPrice = document.getElementById("display-price-on-btn-click");
const totalAmountDisplay2 = document.getElementById("total-amount-display");
const inpFieldContainer = document.getElementById("inp-field-container");
const inpField = document.getElementById("inp-field");
const searchResults = document.getElementById("result-list");
const dynamic_h3_text = document.getElementById("dynamic-text");
const priceList = document.getElementById("price-list");
const totalAmountDisplay = document.getElementById("total-amount");
const selectedItemsDisplay = document.getElementById(
  "selected-items-container"
);
let totalPrice = 0;

//Array of grocery items....

let groceryItems = [
  { name: "Lettuce", price: 5 },
  { name: "Milk", price: 7 },
  { name: "Tomatoes", price: 6 },
  { name: "Fish", price: 7 },
  { name: "Eggs", price: 10 },
  { name: "Garri", price: 10 },
  { name: "Banana", price: 11 },
  { name: "Cabbage", price: 15 },
  { name: "Green peas", price: 3 },
  { name: "Garri", price: 10 },
  { name: "Rice", price: 15 },
  { name: "Green Apples", price: 13 },
  { name: "Red Apples", price: 17 },
  { name: "Melons", price: 20 },
  { name: "Beans", price: 30 },
  { name: "Yoghurt", price: 40 },
  { name: `Water... `, price: 1 },
];

//Lol idk what groceries are ¯\_(ツ)_/¯

//Array of selected groceries
let selectedGroceries = []; // For storing selected groceries

//Logic and shiii :[

// Search function ... :)
inpField.addEventListener("input", () => {
  const searchTerm = inpField.value.toLowerCase();
  const filteredGroceries = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  displayItemsWeHave(filteredGroceries);
});
// Checks if item has been selected earlier...
// If yes then just go ahead to display
// Otherwise add item and then display
function selectedGroceriesNotSelected(currentGrocery) {
  const existingItem = selectedGroceries.find(
    (item) => item.name === currentGrocery.name
  );

  if (!existingItem) {
    currentGrocery.quantity = 1;
    selectedGroceries.push(currentGrocery);
    totalPrice += currentGrocery.price;
  } else {
    existingItem.quantity += 1;
    totalPrice += existingItem.price;
  }

  displaySelectedGroceries();
  totalAmountDisplay.textContent = `Your total amount to pay is: $${totalPrice}`;
}
function displayItemsWeHave(matches) {
  searchResults.innerHTML = "";
  if (matches.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No groceries found 😔";
    p.className = "not-found-msg";
    searchResults.appendChild(p);
    return;
  }
  dynamic_h3_text.textContent = `Some of our groceries include`;

  matches.forEach((groceries) => {
    const li_1 = document.createElement("li");
    const li_2 = document.createElement("li");
    const div = document.createElement("div");
    li_1.className = "itemName";
    li_2.className = "itemPrice";
    li_1.textContent = `${groceries.name}`;
    li_2.textContent = `$${groceries.price}`;
    searchResults.appendChild(div);
    div.appendChild(li_1);
    div.appendChild(li_2);
    div.addEventListener("click", () => {
      console.log(groceries.name);
      selectedGroceriesNotSelected(groceries);
      displaySelectedGroceries();
      inpField.value = groceries.name;
      inpField.value = "";

      totalAmountDisplay.textContent = `Your total amount to pay is: $${totalPrice}`;
      setTimeout(() => displayItemsWeHave(groceryItems), 500); //Simply delays when the embedde code runs.... :)
    });
  });
}

// Displays items the user has selected and clears old data so as to avoid issues....
// N.B: data is gotten from the array: "selectedGroceries"
function displaySelectedGroceries() {
  totalPrice = 0;
  selectedItemsDisplay.innerHTML = "";
  selectedGroceries.forEach((groceries) => {
    const index = selectedGroceries.indexOf(groceries);
    const divSelected = document.createElement("div");
    divSelected.className = "selectedItemsDisplayContainer";
    const li_selected_Name = document.createElement("li");
    const li_selected_Price = document.createElement("li");
    const quantityCounter = document.createElement("div");
    quantityCounter.className = "quantityCounter";
    quantityCounter.textContent = `x(${groceries.quantity})`;
    const reduceButton = document.createElement("button");
    reduceButton.textContent = "Reduce quantity";

    reduceButton.addEventListener("click", () => {
      if (groceries.quantity > 1) {
        groceries.quantity -= 1;
        totalPrice -= groceries.price; // Subtract one item's price
      } else {
        const index = selectedGroceries.indexOf(groceries);
        selectedGroceries.splice(index, 1);
      }

      displaySelectedGroceries(); // Refresh display
      totalAmountDisplay.textContent = `Your total amount to pay is: $${totalPrice}`;
    });

    const deleteButton = document.createElement("button");
    li_selected_Name.textContent = groceries.name;
    li_selected_Price.textContent = `$${groceries.price}`;
    selectedItemsDisplay.appendChild(divSelected);
    divSelected.appendChild(li_selected_Name);
    divSelected.appendChild(li_selected_Price);
    divSelected.appendChild(quantityCounter);
    divSelected.appendChild(deleteButton);
    divSelected.appendChild(reduceButton);

    totalPrice += groceries.price * groceries.quantity;
    deleteButton.textContent = `Remove item`;
    deleteButton.addEventListener("click", () => {
      selectedGroceries.splice(index, 1); // Uses splice to smartly remove items
      displaySelectedGroceries();
      console.log(selectedGroceries);
      totalAmountDisplay.textContent = `Your total amount to pay is: $${totalPrice}`;
    });

    console.log(selectedGroceries);
  });
}

function removeItem() {}

displayItemsWeHave(groceryItems); // Just displays the items we currently have in stock :)

const totalPriceBtn = document.createElement("button");
totalAmountDisplay2.appendChild(totalPriceBtn);
totalPriceBtn.textContent = `Calculate Price`;
totalPriceBtn.className = "calcBtn";
totalPriceBtn.addEventListener("click", () => {
  displayPrice.textContent = `Your total amount to pay is: $${totalPrice}`;
  setTimeout(() => {
    displayPrice.textContent = "";
  }, 5000);
});
// Just logs for clarity
// Will be taken out once code is finished.... Hopefully
console.log(groceryItems);
