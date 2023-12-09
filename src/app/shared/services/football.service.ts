import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { COUNTRIES } from "../data/countries";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root"
})
export class FootballService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private apiPaths = { leagues: "/leagues", seasons: "/leagues/seasons" } as const;

  private currentYear = new Date().getFullYear();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  get(path: string, params?: HttpParams, useCache = true): Observable<object> {
    const endpoint = this.apiUrl + path;

    let cacheKey = endpoint;
    if (params) {
      const stringParams = params.toString();

      cacheKey += stringParams;
    }

    if (useCache) {
      const res = this.localStorage.read(cacheKey);

      if (res) {
        return of(res);
      }
    }

    return this.http
      .get(endpoint, {
        headers: { "x-rapidapi-key": this.apiKey, "x-rapidapi-host": "v3.football.api-sports.io" },
        params
      })
      .pipe(tap((res) => this.localStorage.write(cacheKey, res)));
  }

  getSeasons() {
    return this.get(this.apiPaths.seasons);
  }

  getLeagues(year: number) {
    // return this.getLeagues();
  }

  getTopLeague(country: keyof typeof COUNTRIES) {
    console.log(country);
  }
}
