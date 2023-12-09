import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  read(key: string): object | null {
    const item = localStorage.getItem(btoa(key));

    if (item === null) {
      return null;
    }

    return JSON.parse(item);
  }

  write(key: string, data: object) {
    localStorage.setItem(btoa(key), JSON.stringify(data));
  }
}
