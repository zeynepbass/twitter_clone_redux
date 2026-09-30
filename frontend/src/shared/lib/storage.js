export const storage = {
  read(key) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      return;
    }
  },
};
