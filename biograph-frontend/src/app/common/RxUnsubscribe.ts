import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class RxUnsubscribe implements OnDestroy {
  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    console.log('[RxUnsubscribe] destroying...');
    this.destroy$.next();
  }
}
