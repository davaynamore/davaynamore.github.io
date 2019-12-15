function StorageHelper(){
	this.storage = localStorage;

	this.get = (key) => {
		return JSON.parse(localStorage.getItem(key));
	}
	this.set = (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	}
	this.remove = (key) => {
		localStorage.removeItem(key);
	}
}

const Storage = new StorageHelper();

export default Storage;