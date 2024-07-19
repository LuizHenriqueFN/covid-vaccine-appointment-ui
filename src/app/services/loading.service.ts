import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  loadingShow() {
    this.loadingSubject.next(true);
  }

  loadingHide() {
    this.loadingSubject.next(false);
  }
}
