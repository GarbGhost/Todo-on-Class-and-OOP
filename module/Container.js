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
