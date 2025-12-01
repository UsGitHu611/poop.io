import Dexie from "dexie";

class Notes extends Dexie {
  notes;
  constructor() {
    super("notes");
    this.version(1).stores({
      notes: "++id, title, description, createdAt",
    });
    this.notes = this.table("notes");
  }
  async add(title, description) {
    await this.notes.add({
      title,
      description,
      createdAt: new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "numeric",
        year: "2-digit",
      }),
    });
  }

  async update(id, updateValue) {
    console.log(updateValue);

    await this.notes.update(id, updateValue);
  }

  async removeById(id) {
    await this.notes.delete(id);
  }

  async clearAll() {
    await this.notes.clear();
  }
}

export const db = new Notes();
