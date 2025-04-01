import { StorageManager } from "./StorageManager.js";
import { Renderer } from "./Renderer.js";

export class TaskHandler {
  _currentUser = null;

  constructor(taskForm, taskListEl, storage, _users, alertCustom, buttonNote) {
    this.taskForm = taskForm;
    this.taskListEl = taskListEl;
    this.storage = storage;
    this._users = _users;
    this.alertCustom = alertCustom;
    this.buttonNote = buttonNote;
    this.renderer = new Renderer("app");
    this.updateButtonState();
  }

  setupTaskForm() {
    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let inputNoteValue = { value: this.taskForm.firstChild.value };
      if (this._currentUser && inputNoteValue.value !== "") {
        this._currentUser.tasks.push({
          name: inputNoteValue.value,
          completed: false,
        });
        this.setUser(this._currentUser);
        this.storage.save(this._users);
      } else {
        this.alertCustom.classList.remove("d-none");
        this.alertCustom.textContent = !this._currentUser
          ? "Выберите пользователя"
          : "Введите дело";
        setTimeout(() => {
          this.alertCustom.textContent = "";
          this.alertCustom.classList.add("d-none");
        }, 2000);
      }
      this.taskForm.querySelector("input").value = "";
    });
  }

  setUser(user) {
    this._currentUser = user;
    this.taskListEl.innerHTML = "";
    if (this._currentUser) {
      const taskList = this.renderer.renderTasks(
        this._currentUser.tasks,
        this._currentUser.color,
        (task, checked) => {
          task.completed = checked;
          this.storage.save(this._users);
          this.setUser(this._currentUser);
        },
        (task) => this.deleteItem(task)
      );
      this.taskListEl.append(taskList);
    }
  }

  deleteItem(objectTask) {
    let indexFind = this._currentUser.tasks.findIndex(
      (el) => el === objectTask
    );
    if (indexFind !== -1) {
      this._currentUser.tasks.splice(indexFind, 1);
      this.setUser(this._currentUser);
      this.storage.save(this._users);
    }
  }

  updateButtonState() {
    this.buttonNote.disabled = this._users.length === 0;
  }
}
