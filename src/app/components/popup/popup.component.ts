import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements AfterViewInit, OnDestroy {
  @Output() clickedYes = new EventEmitter<void>();
  @Output() clickedNo = new EventEmitter<void>();

  @ViewChild('closeButton')
  closeButton!: ElementRef;

  @ViewChild('noButton')
  noButton!: ElementRef;

  @ViewChild('yesButton')
  yesButton!: ElementRef;

  private close$ = new Subject<void>();
  closeClick$!: Observable<Event>;
  noClick$!: Observable<Event>;
  yesClick$!: Observable<Event>;

  ngAfterViewInit(): void {
    this.closeClick$ = fromEvent<Event>(
      this.closeButton.nativeElement,
      'click'
    );
    this.noClick$ = fromEvent<Event>(this.noButton.nativeElement, 'click');
    this.yesClick$ = fromEvent<Event>(this.yesButton.nativeElement, 'click');

    merge(this.closeClick$, this.noClick$)
      .pipe(takeUntil(this.close$))
      .subscribe(() => {
        this.clickedNo.emit();
      });

    this.yesClick$.pipe(takeUntil(this.close$)).subscribe(() => {
      this.clickedYes.emit();
    });
  }

  ngOnDestroy(): void {
    this.close$.next();
    this.close$.complete();
  }
}
