import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../model/country';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  @ViewChild('searchValue') input: any; // accessing the reference element

  selectedState: { state: string; discription: string } | undefined;
  countryList: Country[] | undefined;
  selectedCoutries: Country[] | undefined;
  countryChar: string | undefined;
  searchedCoutries: Country[] | undefined;
  selectedCountry?: Country;

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.random();
  }

  get charsCountryList(): string[] | undefined {
    var listChar = this.countryList?.map((item) => item.name.charAt(0));
    let uniqueChars = [...new Set(listChar)];

    return uniqueChars;
  }

  set charsCountryList(v: string[] | undefined) {}

  onclickButton(countryChar: string) {
    this.countryChar = countryChar;
    this.input.nativeElement.value = ' ';
    this.selectedCoutries = this.countryList?.filter((item) =>
      item.name.startsWith(countryChar)
    );
    this.searchedCoutries = this.selectedCoutries;
  }

  onClickCountry(country: Country) {
    this.selectedCountry = country;
  }

  onChangeValue(event: any) {
    if (event.target.value) {
      this.searchedCoutries = this.selectedCoutries?.filter((item) =>
        item.name.includes(event.target.value)
      );
    } else {
      this.searchedCoutries = this.selectedCoutries;
    }
  }

  random(): void {
    let i = 0;
    let max = this.states.length;
    var randNumber = Math.floor(Math.random() * max);
    this.selectedState = this.states[randNumber];
    this.selectedCoutries = [];
    this.searchedCoutries = [];
    this.charsCountryList = [];
    this.selectedCountry = undefined;
    if (this.input) {
      this.input.nativeElement.value = ' ';
    }

    this.countryService
      .getCountryByState(this.selectedState.state)
      ?.subscribe((countries) => {
        this.countryList = countries;
      });
    setTimeout(() => {
      this.random();
    }, 15000);
  }

  states = [
    {
      state: 'EU',
      discription: '(European Union)',
    },
    {
      state: 'EFTA',
      discription: '(European Free Trade Association)',
    },
    {
      state: 'CARICOM',
      discription: '(Caribbean Community)',
    },
    {
      state: 'PA',
      discription: '(Pacific Alliance)',
    },
    {
      state: 'AU',
      discription: '(African Union)',
    },
    {
      state: 'USAN',
      discription: '(Union of South American Nations)',
    },
    {
      state: 'EEU',
      discription: '(Eurasian Economic Union)',
    },
    {
      state: 'AL',
      discription: '(Arab League)',
    },
    {
      state: 'ASEAN',
      discription: '(Association of Southeast Asian Nations)',
    },
    {
      state: 'CAIS',
      discription: ' (Central American Integration System)',
    },
    {
      state: 'CEFTA',
      discription: '(Central European Free Trade Agreement)',
    },
    {
      state: 'NAFTA',
      discription: '(North American Free Trade Agreement)',
    },
    {
      state: 'SAARC',
      discription: '(South Asian Association for Regional Cooperation)',
    },
  ];
}
