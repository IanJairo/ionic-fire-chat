import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {
  navData: any;


  constructor() { }

  setNavData(data) {
    this.navData = data;
  }

  getNavData() {
    if (this.navData == null) return 0;
    return this.navData;
  }
}
