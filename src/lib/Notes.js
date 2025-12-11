import Dexie from 'dexie';
import { isMobile } from './isMobile';

export const SORT_TITLE_FIELD = 'title';
export const SORT_DATE_FIELD = 'createdAt';
export const PAGE_SIZE = isMobile ? 4 : 12;

class Notes extends Dexie {
	notes;
	constructor() {
		super('notes');
		this.version(1).stores({
			notes: '++id, title, description, createdAt',
		});
		this.notes = this.table('notes');
	}
	async add(title, description) {
		await this.notes.add({
			title,
			description,
			createdAt: Date.now(),
		});
	}

	async getSortedNotes(value) {
		return this.notes.orderBy(value).toArray();
	}

	async update(id, updateValue) {
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
