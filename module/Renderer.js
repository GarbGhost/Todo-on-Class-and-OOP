export class Renderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error("Container not found");
  }

  renderInitialUI() {
    const h1 = this.createElement("h1", {
      text: "TODO",
      classes: ["text-muted", "text-center"],
    });
    const formAddUser = this.createForm([
      "d-flex",
      "d-lg-flex",
      "flex-column",
      "flex-lg-row",
      "gap-2",
      "mb-3",
    ]);
    const inputAddUser = this.createInput("text", "Введите пользователя", [
      "form-control",
      "w-100",
      "w-lg-25",
    ]);
    const addUserBtn = this.createButton("Добавить пользователя", [
      "btn",
      "btn-warning",
      "mt-2",
      "mt-lg-0",
      "w-100",
      "w-lg-auto",
    ]);
    const userList = this.createElement("ul", {
      classes: ["d-flex", "flex-wrap"],
    });
    const userBlockNote = this.createElement("div", {
      classes: ["d-flex", "flex-column"],
    });
    const formUserNote = this.createForm([
      "d-flex",
      "d-lg-flex",
      "flex-column",
      "flex-lg-row",
      "gap-2",
      "mb-3",
    ]);
    const inputUserNote = this.createInput("text", "Введите дело", [
      "form-control",
      "w-100",
      "w-lg-25",
      "align-self-start",
    ]);
    const buttonNote = this.createButton("Добавить задачу", [
      "btn",
      "btn-primary",
      "mb-3",
      "mt-2",
      "mt-lg-0",
      "w-100",
      "w-lg-auto",
    ]);
    const alertCustom = this.createElement("div", {
      classes: [
        "w-25",
        "h-auto",
        "fs-5",
        "d-inline-block",
        "p-1",
        "d-none",
        "text-white",
        "mb-3",
        "bg-danger",
        "bg-gradient",
        "rounded-pill",
        "text-center",
      ],
    });
    const listUserNote = this.createElement("ul", {
      classes: ["list-group", "gap-1"],
    });

    formAddUser.append(inputAddUser, addUserBtn);
    formUserNote.append(inputUserNote, buttonNote);
    userBlockNote.append(formUserNote, alertCustom, listUserNote);
    this.container.append(h1, formAddUser, userList, userBlockNote);

    return {
      formAddUser,
      inputAddUser,
      addUserBtn,
      userList,
      userBlockNote,
      formUserNote,
      inputUserNote,
      buttonNote,
      alertCustom,
      listUserNote,
    };
  }

  createElement(tag, { text = "", classes = [] } = {}) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (classes.length) el.classList.add(...classes);
    return el;
  }

  createInput(type, placeholder, classes) {
    const input = this.createElement("input", { classes });
    input.type = type;
    input.placeholder = placeholder;
    return input;
  }

  createForm(classes) {
    return this.createElement("form", { classes });
  }

  createButton(text, classes) {
    return this.createElement("button", { text, classes });
  }

  renderUserList(users, selectedUser, onUserClick, onDeleteClick) {
    const ul = this.createElement("ul", { classes: ["d-flex", "flex-wrap"] });
    users.forEach((user) => {
      const li = this.createElement("li", {
        classes: [
          "mb-2",
          "me-3",
          "d-flex",
          "align-items-center",
          "border",
          "border-info",
          "p-2",
          "rounded",
          "user-select-none",
        ],
      });
      if (user === selectedUser) li.classList.add("border-warning");
      li.style.width = "auto";
      li.style.cursor = "pointer";

      const span = this.createElement("span", {
        text: user.name,
        classes: ["me-2"],
      });
      const deleteBtn = this.createButton("Удалить", [
        "btn",
        "btn-outline-info",
        "p-1",
        "btn-sm",
      ]);
      deleteBtn.style.fontSize = "12px";

      li.append(span, deleteBtn);
      ul.append(li);

      li.addEventListener("click", () => onUserClick(user));
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onDeleteClick(user.name);
      });
    });
    return ul;
  }

  renderTasks(tasks, userColor, onCheckChange, onDeleteClick) {
    const ul = this.createElement("ul", { classes: ["list-group", "gap-1"] });
    tasks.forEach((task) => {
      const li = this.createElement("li", {
        classes: [
          "list-group-item",
          "rounded-pill",
          "d-flex",
          "justify-content-between",
          "align-items-center",
        ],
      });
      li.style.backgroundColor = userColor;

      const span = this.createElement("span", {
        text: task.name.toUpperCase(),
      });
      if (task.completed)
        span.classList.add("text-decoration-line-through", "fst-italic");

      const group = this.createElement("div", {
        classes: ["d-flex", "gap-3", "align-items-center", "border-info"],
      });
      const checkbox = this.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () =>
        onCheckChange(task, checkbox.checked)
      );

      const deleteBtn = this.createButton("Удалить", [
        "btn",
        "btn-danger",
        "p-1",
        "btn-sm",
        "rounded-3",
      ]);
      deleteBtn.addEventListener("click", () => onDeleteClick(task));

      group.append(checkbox, span);
      li.append(group, deleteBtn);
      ul.append(li);
    });
    return ul;
  }
}
