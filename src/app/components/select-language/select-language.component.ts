import { Component, Input } from '@angular/core';
import * as languageData from '../../../../public/json/languages.json';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss',
})
export class SelectLanguageComponent {
  @Input() control = new FormControl();
  languages: string[] = languageData.languages;
}
