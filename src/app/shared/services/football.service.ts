import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { COUNTRIES } from "../data/countries";
import { LocalStorageService } from "./localstorage.service";
import { LEAGUES_ID } from "../data/leagues";

@Injectable({
  providedIn: "root"
})
export class FootballService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private apiPaths = { leagues: "/leagues", seasons: "/leagues/seasons" } as const;

  private currentHour = new Date().getHours();
  private currentYear = new Date().getFullYear();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  get(path: string, params?: HttpParams, useCache: "hourly" | "daily" = "daily"): Observable<object> {
    const endpoint = this.apiUrl + path;

    let cacheKey = endpoint;
    if (params) {
      const stringParams = params.toString();
      const timeParams = useCache === "hourly" ? this.currentHour : this.currentYear;

      cacheKey += stringParams + timeParams;
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

  getLeagues(season: number, countryCode: keyof typeof COUNTRIES) {
    let leagueId: number = LEAGUES_ID.serie_a;

    switch (countryCode) {
      case "ES": {
        leagueId = LEAGUES_ID.la_liga;
        break;
      }
      case "DE": {
        leagueId = LEAGUES_ID.bundesliga;
        break;
      }
      case "FR": {
        leagueId = LEAGUES_ID.ligue_1;
        break;
      }
      case "EN": {
        leagueId = LEAGUES_ID.premier_league;
        break;
      }
    }

    return this.get(this.apiPaths.leagues, new HttpParams({ fromObject: { season, code: countryCode, id: leagueId } }));
  }

  getCurrentSeasonLeagues(countryCode: keyof typeof COUNTRIES) {
    return this.getLeagues(this.currentYear, countryCode);
  }
}
