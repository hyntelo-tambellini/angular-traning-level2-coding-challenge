import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { COUNTRIES } from "../data/countries";
import { LocalStorageService } from "./localstorage.service";
import { LEAGUES_ID } from "../data/leagues";
import * as APIFootball from "../types/api-football";

@Injectable({
  providedIn: "root"
})
export class FootballService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private apiPaths = { leagues: "/leagues", seasons: "/leagues/seasons", standings: "/standings" } as const;

  private currentHour = new Date().getHours();
  private currentYear = new Date().getFullYear();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  get(path: string, params?: HttpParams, useCache: "hourly" | "daily" = "daily"): Observable<APIFootball.Response> {
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
      .get<APIFootball.Response>(endpoint, {
        headers: { "x-rapidapi-key": this.apiKey, "x-rapidapi-host": "v3.football.api-sports.io" },
        params
      })
      .pipe(
        tap((res) => {
          if (res.errors?.length) {
            console.error(res.errors);
          }
        }),
        tap((res) => this.localStorage.write(cacheKey, res))
      );
  }

  getSeasons() {
    return this.get(this.apiPaths.seasons);
  }

  getLeagues(leagueId: number, countryCode: keyof typeof COUNTRIES) {
    return this.get(
      this.apiPaths.leagues,
      new HttpParams({ fromObject: { season: this.currentYear, code: countryCode, id: leagueId } })
    ).pipe(map((res) => (res.response ? res.response[0] : [])));
  }

  getLeagueStandings(leagueId: number) {
    return this.get(
      this.apiPaths.standings,
      new HttpParams({ fromObject: { season: this.currentYear, league: leagueId } })
    );
  }

  getLeagueFromCountry(countryCode: string) {
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

    return leagueId;
  }
}
