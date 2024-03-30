let $ = document;
let itemInput = $.querySelector("#itemInput");
let addButton = $.querySelector("#addButton");
let clearButton = $.querySelector("#clearButton");
let ulElem = $.querySelector("#todoList");

let todoList = [];

addButton.addEventListener("click", function () {
  let optionTodoList = {
    title: itemInput.value,
    id: todoList.length + 1,
    complate: true,
  };

  todoList.push(optionTodoList);
  localStorageFunc(todoList);
  creatElements(todoList);
});

function localStorageFunc(todoList) {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function creatElements(items) {
  itemInput.value = "";
  ulElem.innerHTML = "";

  items.forEach(function (item) {
    let newLi = $.createElement("li");
    newLi.className = "completed well";

    let newLabel = $.createElement("label");
    newLabel.innerHTML = item.title;

    let buttonComplate = $.createElement("button");
    buttonComplate.className = "btn btn-success";
    buttonComplate.innerHTML = "complate";

    let buttonDelete = $.createElement("button");
    buttonDelete.className = "btn btn-danger";
    buttonDelete.innerHTML = "delete";

    newLi.append(newLabel, buttonComplate, buttonDelete);
    ulElem.append(newLi);

    buttonComplate.addEventListener("click", function () {
      if (item.complate) {
        buttonComplate.classList.add("uncompleted label");
        newLabel.classList.add("uncompleted label");
        item.complate = false;
      } else {
        buttonComplate.classList.add("completed");
        newLabel.classList.add("completed");
        item.complate = true;
      }
    });
  });
}

window.addEventListener("load", function () {
  let getlocal = JSON.parse(this.localStorage.getItem("todo"));
  if (getlocal) {
    todoList = getlocal;
  } else {
    todoList = [];
  }
  creatElements(todoList);
});
