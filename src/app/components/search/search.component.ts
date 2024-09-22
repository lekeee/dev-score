import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewInit {
  @Output() searchClicked = new EventEmitter<string>();
  @Output() languageSelected = new EventEmitter<string>();

  searchForm = new FormGroup({
    title: new FormControl(''),
    language: new FormControl(''),
  });

  @ViewChild('searchIcon', { static: true })
  searchIcon!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.searchForm.get('language')?.valueChanges.subscribe((language) => {
      this.languageSelected.emit(language!);
    });

    fromEvent(this.searchIcon.nativeElement, 'click').subscribe(() => {
      let title = this.searchForm.get('title')?.value;
      if (title) this.searchClicked.emit(title!);
    });
  }
}
