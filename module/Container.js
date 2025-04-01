import { Renderer } from "./Renderer.js";
import { UserHandler } from "./UserHandler.js";

export class Container {
  constructor() {
    this.renderer = new Renderer("app");
    const uiElements = this.renderer.renderInitialUI();
    this.userHandler = new UserHandler(
      uiElements.formAddUser,
      uiElements.inputAddUser,
      uiElements.addUserBtn,
      uiElements.userList,
      uiElements.userBlockNote,
      uiElements.formUserNote,
      uiElements.listUserNote,
      uiElements.alertCustom,
      uiElements.buttonNote
    );
  }
}

// import { UserHandler } from "./UserHandler.js";

// export class Container {
//   constructor() {
//     this.container = document.getElementById("app");
//     if (!this.container) {
//       throw new Error("App not found");
//     }

//     this.h1 = document.createElement("h1");
//     this.h1.textContent = "TODO";
//     this.h1.classList.add("text-muted", "text-center");

//     this.formAddUser = document.createElement("form");
//     this.formAddUser.classList.add("d-flex", "gap-2", "mb-3");

//     this.inputAddUserToForm = document.createElement("input");
//     this.inputAddUserToForm.classList.add("form-control", "w-25");
//     this.inputAddUserToForm.type = "text";
//     this.inputAddUserToForm.placeholder = "Введите пользователя";

//     this.addUserBtn = document.createElement("button");
//     this.addUserBtn.classList.add("btn", "btn-warning");
//     this.addUserBtn.textContent = "Добавить пользователя";

//     this.userList = document.createElement("ul");
//     this.userList.classList.add("d-flex", "flex-wrap");

//     this.userBlockNote = document.createElement("div");
//     this.userBlockNote.classList.add("d-flex", "flex-column");

//     this.formUserNote = document.createElement("form");
//     this.formUserNote.classList.add("d-flex", "gap-2", "mb-3");

//     this.inputUserNote = document.createElement("input");
//     this.inputUserNote.classList.add(
//       "form-control",
//       "w-25",
//       "align-self-start"
//     );
//     this.inputUserNote.type = "text";
//     this.inputUserNote.placeholder = "Введите дело";

//     this.buttonNote = document.createElement("button");
//     this.buttonNote.classList.add("btn", "btn-primary", "mb-3");
//     this.buttonNote.textContent = "Добавить задачу";

//     this.alertCustom = document.createElement("div");
//     this.alertCustom.classList.add(
//       "w-25",
//       "h-auto",
//       "fs-5",
//       "d-inline-block",
//       "p-1",
//       "d-none",
//       "text-white",
//       "mb-3",
//       "bg-danger",
//       "bg-gradient",
//       "rounded-pill",
//       "text-center"
//     );

//     this.listUserNote = document.createElement("ul");
//     this.listUserNote.classList.add("list-group", "gap-1");

//     this.formAddUser.append(this.inputAddUserToForm, this.addUserBtn);
//     this.formUserNote.append(this.inputUserNote, this.buttonNote);
//     this.userBlockNote.append(
//       this.formUserNote,
//       this.alertCustom,
//       this.listUserNote
//     );
//     this.container.append(
//       this.h1,
//       this.formAddUser,
//       this.userList,
//       this.userBlockNote
//     );

//     this.userHandler = new UserHandler(
//       this.formAddUser,
//       this.inputAddUserToForm,
//       this.addUserBtn,
//       this.userList,
//       this.userBlockNote,
//       this.formUserNote,
//       this.listUserNote,
//       this.alertCustom,
//       this.buttonNote
//     );
//   }
// }
