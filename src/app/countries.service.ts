import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, Subscriber } from 'rxjs';
import { Country } from './model/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}
  countryByState = new Map<string, Observable<Country[]>>();

  getCountryByState(state: string): Observable<Country[]> | undefined {
    if (this.countryByState.has(state)) {
      return this.countryByState.get(state);
    } else {
      var obs = this.http.get<any>(
        `https://restcountries.com/v2/regionalbloc/${state}`
      );
      this.countryByState.set(state, obs);
      return obs;
    }
  }
}
