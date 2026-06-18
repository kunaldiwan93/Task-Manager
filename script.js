const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskCategory = document.getElementById("task-category");
const taskContainer = document.getElementById("task-container");

const themeBtn = document.getElementById("theme-toggle");
const clearBtn = document.getElementById("clear-all");
const filter = document.getElementById("filter-category");
const search = document.getElementById("search-input");

let taskNumber = 1;

document.body.dataset.theme = "light";

taskForm.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();

    const title = taskInput.value.trim();
    const category = taskCategory.value;

    if (!title) return;

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.setAttribute("data-id", Date.now());
    taskCard.setAttribute("data-status", "pending");
    taskCard.setAttribute("data-category", category);

    const titleElement = document.createElement("h3");
    titleElement.textContent = `${taskNumber}. ${title}`;

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${category}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    buttonContainer.append(
        editBtn,
        completeBtn,
        deleteBtn
    );

    taskCard.append(
        titleElement,
        categoryElement,
        buttonContainer
    );

    taskContainer.appendChild(taskCard);

    taskInput.value = "";

    taskNumber++;

    updateCounters();
}

taskContainer.addEventListener("click", (e) => {

    const taskCard = e.target.closest(".task-card");

    if (!taskCard) return;

    if (e.target.classList.contains("delete-btn")) {
        taskCard.remove();
        updateCounters();
    }

    if (e.target.classList.contains("complete-btn")) {

        if (taskCard.dataset.status === "completed") {
            taskCard.dataset.status = "pending";
        } else {
            taskCard.dataset.status = "completed";
        }

        taskCard.classList.toggle("completed");

        updateCounters();
    }

    if (e.target.classList.contains("edit-btn")) {

        const title = taskCard.querySelector("h3");

        const input = document.createElement("input");
        input.value = title.textContent;

        title.replaceWith(input);

        input.focus();

        input.addEventListener("blur", () => {
            const newTitle = document.createElement("h3");
            newTitle.textContent = input.value;
            input.replaceWith(newTitle);
        });
    }
});

function updateCounters() {

    const tasks = document.querySelectorAll(".task-card");

    let completed = 0;
    let pending = 0;

    tasks.forEach(task => {
        if (task.dataset.status === "completed") {
            completed++;
        } else {
            pending++;
        }
    });

    document.getElementById("completed-count").textContent = completed;
    document.getElementById("pending-count").textContent = pending;
}

clearBtn.addEventListener("click", () => {
    taskContainer.innerHTML = "";
    updateCounters();
});

filter.addEventListener("change", () => {

    const value = filter.value;

    document.querySelectorAll(".task-card")
        .forEach(task => {

            if (
                value === "All" ||
                task.dataset.category === value
            ) {
                task.style.display = "block";
            }
            else {
                task.style.display = "none";
            }
        });
});

search.addEventListener("input", () => {

    const text = search.value.toLowerCase();

    document.querySelectorAll(".task-card")
        .forEach(task => {

            const title = task
                .querySelector("h3")
                .textContent
                .toLowerCase();

            task.style.display =
                title.includes(text)
                    ? "block"
                    : "none";
        });
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.dataset.theme === "dark") {
        document.body.dataset.theme = "light";
    }
    else {
        document.body.dataset.theme = "dark";
    }
});

const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
const output = document.getElementById("event-output");

function log(message) {
    output.innerHTML += `<br>${message}`;
}

grandparent.addEventListener(
    "click",
    () => log("Capture: Grandparent"),
    true
);

parent.addEventListener(
    "click",
    () => log("Capture: Parent"),
    true
);

child.addEventListener(
    "click",
    () => log("Capture: Child"),
    true
);

child.addEventListener(
    "click",
    () => log("Bubble: Child")
);

parent.addEventListener(
    "click",
    () => log("Bubble: Parent")
);

grandparent.addEventListener(
    "click",
    () => log("Bubble: Grandparent")
);