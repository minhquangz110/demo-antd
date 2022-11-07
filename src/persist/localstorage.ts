export const TOKEN_KEY = "token";
export const PROFILE = "profile";
export const CART = "cart";
export function getStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function setStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function removeStorage(key: string) {
  localStorage.removeItem(key);
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE);
}

export function getToken() {
  return getStorage(TOKEN_KEY);
}
export function setToken(token: string) {
  return setStorage(TOKEN_KEY, token);
}

export function getProfile() {
  return getStorage(PROFILE);
}
export function setProfile(profile: string) {
  return setStorage(PROFILE, profile);
}

export function setCart(cart: any[]) {
  return setStorage(CART, cart);
}
export function getCart() {
  return getStorage(CART);
}
