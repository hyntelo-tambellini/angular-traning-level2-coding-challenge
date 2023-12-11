import { Injectable } from "@angular/core";
import * as APIFootball from "../types/api-football";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  read(key: string): APIFootball.Response | null {
    const item = localStorage.getItem(btoa(key));

    if (item === null) {
      return null;
    }

    return JSON.parse(item);
  }

  write(key: string, data: APIFootball.Response) {
    localStorage.setItem(btoa(key), JSON.stringify(data));
  }
}
