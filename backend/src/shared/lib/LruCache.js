export class LruCache {
  #entries = new Map();
  #size = 0;

  constructor({ maxSize, sizeOf = () => 1 }) {
    this.maxSize = maxSize;
    this.sizeOf = sizeOf;
  }

  get(key) {
    const value = this.#entries.get(key);
    if (value === undefined) return undefined;
    this.#entries.delete(key);
    this.#entries.set(key, value);
    return value;
  }

  set(key, value) {
    const size = this.sizeOf(value);
    if (size > this.maxSize) return;

    this.delete(key);
    this.#entries.set(key, value);
    this.#size += size;

    for (const [oldestKey] of this.#entries) {
      if (this.#size <= this.maxSize) break;
      this.delete(oldestKey);
    }
  }

  delete(key) {
    const value = this.#entries.get(key);
    if (value === undefined) return;
    this.#entries.delete(key);
    this.#size -= this.sizeOf(value);
  }
}
