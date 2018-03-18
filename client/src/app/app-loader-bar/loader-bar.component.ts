import {Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../service/loader.service';
import { LoaderState } from '../loader-state/loader-state';

import { MatProgressBarModule } from '@angular/material';

@Component({
  selector: 'app-loader-bar',
  templateUrl: 'loader-bar.component.html',
  styleUrls: ['loader-bar.component.css'],
})

export class LoaderBarComponent implements OnInit, OnDestroy {

  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
