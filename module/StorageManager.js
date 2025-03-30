

export class StorageManager {
    constructor(key) {
        this.key = key
    }

    save(data) {
      
        localStorage.setItem(this.key, JSON.stringify(data))
    }
    load() {
        const localData = localStorage.getItem(this.key);
        return localData ? JSON.parse(localData) : [];
      }
}