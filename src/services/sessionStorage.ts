/*eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from "jwt-decode";

import { Token } from "@/types";

export default class SessionStorageService {
  public static setItem(key: string, value: any): void {
    window.sessionStorage.setItem(key, value);
  }

  public static setUser(key: string, value: any): void {
    window.sessionStorage.setItem(key, value);
  }

  public static getUser(key: string): any {
    const item = window.sessionStorage.getItem(key);
    return item;
  }

  public static getItem(key: string): any {
    const item = window.sessionStorage.getItem(key);
    return item;
  }

  public static decodeToken(): Token {
    let decoded = this.getItem("token");
    if (decoded) {
      decoded = jwt_decode(decoded);
      return decoded;
    }
    return decoded;
  }

  public static user(): Token {
    let decoded = this.getItem("user");
    decoded = JSON.parse(decoded);
    return decoded;
  }

  public static removeItem(key: string) {
    window.sessionStorage.removeItem(key);
  }

  public static clear() {
    window.sessionStorage.clear();
  }
}
