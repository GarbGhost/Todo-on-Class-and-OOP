export class TaskHandler {
  _currentUser = null;

  /**
   * @param {HTMLFormElement} taskForm
   * @param {HTMLUListElement} taskList
   * @param {StorageManager} storage
   */
  constructor(taskForm, taskList, storage, _users, alertCustom, buttonNote) {
    this.taskForm = taskForm;
    this.taskList = taskList;
    this.storage = storage;
    this._users = _users;
    this.alertCustom = alertCustom;
    this.buttonNote = buttonNote;
    this.updateButtonState();
  }

  setupTaskForm() {
    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let inputNoteValue = {
        value: this.taskForm.firstChild.value,
      };
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
    this.taskList.innerHTML = "";
    if (this._currentUser) {
      for (const objTask of this._currentUser.tasks) {
        const taskItem = document.createElement("li");
        taskItem.style.backgroundColor = this._currentUser.color;
        taskItem.classList.add(
          "list-group-item",
          "rounded-pill",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        const taskSpan = document.createElement("span");
        taskSpan.textContent = objTask.name.toUpperCase();
        if (objTask.completed) {
          taskSpan.classList.add("text-decoration-line-through", "fst-italic");
        }
        const taskItemGroup = document.createElement("div");
        taskItemGroup.classList.add(
          "d-flex",
          "gap-3",
          "align-items-center",
          "border-info"
        );

        const taskCheckBtn = document.createElement("input");
        taskCheckBtn.type = "checkbox";
        taskCheckBtn.checked = objTask.completed;
        taskCheckBtn.addEventListener("change", () => {
          objTask.completed = taskCheckBtn.checked;

          if (objTask.completed) {
            taskSpan.classList.add(
              "text-decoration-line-through",
              "fst-italic"
            );
          } else {
            taskSpan.classList.remove(
              "text-decoration-line-through",
              "fst-italic"
            );
          }

          this.storage.save(this._users);
        });

        const taskRemoveBtn = document.createElement("button");
        taskRemoveBtn.textContent = "Удалить";
        taskRemoveBtn.classList.add(
          "btn",
          "btn-danger",
          "p-1",
          "btn-sm",
          "rounded-3"
        );

        taskRemoveBtn.addEventListener("click" ,()=>{
        this.deleteItem(objTask)

        })

        taskItemGroup.append(taskCheckBtn, taskSpan);
        taskItem.append(taskItemGroup, taskRemoveBtn);
        this.taskList.append(taskItem);
      }
    }
  }

  deleteItem(objectTask) {

    let indexFind = this._currentUser.tasks.findIndex((el) => el === objectTask);
    if (indexFind !== -1) {
      this._currentUser.tasks.splice(indexFind, 1);
      this.setUser(this._currentUser)
      this.storage.save(this._users);

    }
  }

  updateButtonState() {
    this.buttonNote.disabled = this._users.length === 0;
  }
}
