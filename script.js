// DOM Objects......

const inpField = document.getElementById("inp-field");
const searchResults = document.getElementById("result-list");
const selectedFruitsDisplay = document.getElementById(
  "Selected-groceries-container"
);

//Array of grocery items....
let groceryItems = [
  { name: "Lettuce", price: `$${5}` },
  { name: "Milk", price: `$${7}` },
];

console.log(groceryItems[1]);
