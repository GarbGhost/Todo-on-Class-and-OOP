import { StorageManager } from "./StorageManager.js";
import { TaskHandler } from "./TaskHandler.js";
import { Renderer } from "./Renderer.js";

export class UserHandler {
  _users = [];
  _selectedUser = null;

  constructor(
    formAddUser,
    input,
    addButton,
    userListEl,
    taskBlock,
    taskForm,
    taskListEl,
    alertCustom,
    buttonNote
  ) {
    this.storage = new StorageManager("users");
    this._users = this.storage.load();
    this.renderer = new Renderer("app"); // Можно передать через параметр, если нужно
    this.formAddUser = formAddUser;
    this.input = input;
    this.addButton = addButton;
    this.userListEl = userListEl;
    this.taskBlock = taskBlock;
    this.taskForm = taskForm;
    this.taskListEl = taskListEl;
    this.alertCustom = alertCustom;
    this.buttonNote = buttonNote;
    this.taskHandler = new TaskHandler(
      this.taskForm,
      this.taskListEl,
      this.storage,
      this._users,
      this.alertCustom,
      this.buttonNote
    );
    this.setupSubmitHandler();
    this.toggleButtonState();
    this.addButton.disabled = true;
    this.input.addEventListener("input", () => this.toggleButtonState());
    this.renderUserList();
    this.taskHandler.setupTaskForm();
  }

  setupSubmitHandler() {
    this.formAddUser.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.input.value.trim() === "") return;
      this._users.push({
        name: this.input.value.trim().toUpperCase(),
        tasks: [],
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      });
      this.taskHandler.updateButtonState();
      this.clearInput();
      this.toggleButtonState();
      this.renderUserList();
      this.storage.save(this._users);
    });
  }

  deleteUser(objectName) {
    let indexFind = this._users.findIndex((el) => el.name === objectName);
    if (this._selectedUser && this._selectedUser.name === objectName)
      this._selectedUser = null;
    if (indexFind !== -1) {
      this._users.splice(indexFind, 1);
      this.taskHandler.setUser(this._selectedUser);
      this.taskHandler.updateButtonState();
      this.storage.save(this._users);
      this.renderUserList();
    }
  }

  renderUserList() {
    const userList = this.renderer.renderUserList(
      this._users,
      this._selectedUser,
      (user) => {
        this._selectedUser = user;
        this.taskBlockVisible(user);
        this.taskHandler.setUser(this._selectedUser);
        this.renderUserList();
      },
      (name) => this.deleteUser(name)
    );
    this.userListEl.innerHTML = "";
    this.userListEl.append(userList);
  }

  toggleButtonState() {
    this.addButton.disabled = this.input.value.trim() === "";
  }

  clearInput() {
    this.input.value = "";
  }

  taskBlockVisible(obj) {
    if (this.taskListEl.children.length > 0 || this._selectedUser === obj) {
      this.taskBlock.classList.remove("d-none");
    }
  }
}
