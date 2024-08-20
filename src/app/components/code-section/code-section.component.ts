import { Component } from '@angular/core';

@Component({
  selector: 'app-code-section',
  templateUrl: './code-section.component.html',
  styleUrl: './code-section.component.scss',
})
export class CodeSectionComponent {
  selectedLanguage: string = 'kotlin';

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }
}
