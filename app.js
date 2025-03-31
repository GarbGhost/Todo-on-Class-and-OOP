import { Container } from "./module/Container.js";
try {
 new Container();
} catch (error) {
  console.error("Ошибка при запуске приложения:", error);
}