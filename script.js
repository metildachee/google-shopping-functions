const submitButton = document.getElementById("submit");
submitButton.onclick = search;

function search() {
  var itemsArray = getItems();
  var currentInput = document.getElementById("input").value;
  switch(parseInt(currentInput)) {
    case 1: // The number of product items
      overwrite(itemsArray.length);
      break;
    case 2: overwrite(displayCountries(itemsArray));
      break;
    case 3: overwrite(totalPrice(itemsArray));
      break;
    case 4: overwrite("Enter 1, 2 or 3");
      break;
    default: overwrite(minMaxHandler(itemsArray, currentInput));
  }
}
// Returns items
function getItems() {
  isEmpty(products.items);
  return products.items;
}

// Returns an array of items (brand) [[item1 - array][item2]]
function getItemsByBrand(itemsArray, brand) {
  let brandArray = [];
  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].product.brand == brand) {
      brandArray.push(itemsArray[i]);
    }
  }
  isEmpty(itemsArray);
  return brandArray;
}

function getItemsByAuthor(itemsArray, author) {
  let authorsArray = [];
  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].product.author.name == author) {
      authorsArray.push(itemsArray[i]);
    }
  }
  isEmpty(itemsArray);
  return authorsArray;
}

function getAvailableProducts(itemArray) {
  let availArray = [];
  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].product.inventories[0].availability) {
      availArray.push(itemsArray[i]);
    }
  }
  isEmpty(itemsArray);
  return availArray;
}

function isEmpty(itemsArray) {
  if (itemsArray.length == 0) {
    console.log("There are no items for your request.");
    return true;
  }
  return false;
}

var overwrite = function(data){
    var output = document.querySelector('#output');
    output.innerText = data;
}

var itemsArray = getItems();
console.log(getItemsByBrand(itemsArray, "Nikon"));
console.log(getItemsByAuthor(itemsArray, "Abt Electronics & Appliances"));
console.log(getAvailableProducts(itemsArray));

function displayCountries(itemsArray) {
  let displayMessage = "";
  for (var i = 0; i < itemsArray.length; i++) {
    displayMessage += " Item: " + itemsArray[i].product.title
      + " Country: " + itemsArray[i].product.country;
  }
  return displayMessage;
}

function totalPrice(itemsArray) {
  let totalSum = 0;
  for (var i = 0; i < itemsArray.length; i++) {
    totalSum += itemsArray[i].product.inventories[0].price;
  }
  return totalSum;
}

function splitMax(text) {
    let numbers = text.split(",");
    console.log(numbers);
    return numbers;
}

function minMax(itemsArray, min, max) {
    let newArray = [];
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].product.inventories[0].price <= max
            && itemsArray[i].product.inventories[0].price >= min) {
            newArray.push(itemsArray[i]);
        }
    }
    return newArray;
}

function minMaxHandler(itemsArray, input) {
    let displayMessage = "Items: ";
    let minMaxArray = splitMax(input);
    let newArray = minMax(itemsArray, minMaxArray[0], minMaxArray[1]);
    for (var i = 0; i < newArray.length; i++) {
        displayMessage += newArray[i].product.title + ", ";
    }
    return displayMessage;
}