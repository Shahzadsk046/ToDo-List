const add = document.getElementById("add");
var itemJsonArray = [];
function getAndUpdate() {
  console.log("Updating List...");
  let itemTitle = document.getElementById("title").value;
  let itemDesc = document.getElementById("description").value;
  console.log(itemTitle + ": " + itemDesc);
  if (localStorage.getItem("itemsJson") == null) {
    console.log("Updating List...");
    var itemJsonArray = [];
    itemJsonArray.push([`${itemTitle}`, `${itemDesc}`]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    var itemJsonArrayStr = localStorage.getItem("itemsJson");
    var itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([itemTitle, itemDesc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    console.log("Updating List...");
    var itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    var itemJsonArrayStr = localStorage.getItem("itemsJson");
    var itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  // populate the table
  tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button class="btn btn-primary btn-sm" onclick="deleted(${index})">Delete</button></td>
    </tr>`;
  });
  tableBody.innerHTML = str;
}

add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage(){
    if(confirm("Do you really want to clear all?")){
    console.log("Clearing the Storage");
    localStorage.clear();
    update();
    }
}