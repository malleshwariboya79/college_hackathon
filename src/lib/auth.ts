export type User = {
  name: string;
  email?: string;
};

const KEY = "ap_user_v1";
const KEY_USERS = "ap_users_v1";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

export function isAuthenticated() {
  return getUser() !== null;
}

type StoredUser = { name: string; email: string; password: string };

function getAllUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(KEY_USERS);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveAllUsers(users: StoredUser[]) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | null {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function registerUser(name: string, email: string, password: string): boolean {
  if (!email) return false;
  const users = getAllUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return false; // already exists
  users.push({ name, email, password });
  saveAllUsers(users);
  return true;
}

export function validateCredentials(email: string, password: string): StoredUser | null {
  const u = findUserByEmail(email);
  if (!u) return null;
  return u.password === password ? u : null;
}
