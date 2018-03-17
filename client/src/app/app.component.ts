import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material';

import { UserService } from './service/user.service';
import { CurrencyService } from './service/currency.service';
import { AlertService } from './service/alert.service';
import { TableColumnUtils } from './service/table-column.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService,
    CurrencyService,
    AlertService,
    TableColumnUtils
  ]
})

export class AppComponent {

//  constructor(public route: ActivatedRoute, public location: Location) { }



  mobileQuery: MediaQueryList;
  title = 'App';

  fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
