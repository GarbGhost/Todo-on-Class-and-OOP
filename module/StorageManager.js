export class StorageManager {
  constructor(key) {
    this.key = key;
  }
  save(data) {
    if (data === undefined || data === null) {
      console.warn("Попытка сохранить невалидные данные в localStorage");
      return;
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  load() {
    const localData = localStorage.getItem(this.key);
    if (!localData) return [];
    try {
      return JSON.parse(localData);
    } catch (error) {
      console.error(`Ошибка при загрузке данных из ${this.key}:`, error);
      return [];
    }
  }
}
