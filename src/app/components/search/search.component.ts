import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Output() searchClicked = new EventEmitter<string>();
  @Output() languageSelected = new EventEmitter<string>();
  searchForm = new FormGroup({
    title: new FormControl(''),
    language: new FormControl(''),
  });

  ngOnInit(): void {
    this.searchForm.get('language')?.valueChanges.subscribe((language) => {
      this.languageSelected.emit(language!);
    });
  }

  onSearchClick() {
    let title = this.searchForm.get('title')?.value;
    if (title != '') this.searchClicked.emit(title!);
  }
}
