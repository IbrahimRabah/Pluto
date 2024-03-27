import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor() { }
  private _isSidebarVisible = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this._isSidebarVisible.asObservable();

  toggleSidebar() {
    this._isSidebarVisible.next(!this._isSidebarVisible.value);
  }

}
