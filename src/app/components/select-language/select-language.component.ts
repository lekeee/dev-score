import { Component } from '@angular/core';
import * as languageData from '../../../../public/json/languages.json';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss',
})
export class SelectLanguageComponent {
  languages: string[] = languageData.languages;
}
