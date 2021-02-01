import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Store} from '@ngrx/store';
import {State} from './core/reducers';
import {ReLoginRequestedAction} from './auth/store/auth.actions';
import {AuthService} from './auth/services/auth.service';
import {NavigationEnd, Router} from "@angular/router";
import {GoogleAnalyticsService} from "ngx-google-analytics";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-arlearn',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    constructor(private store: Store<State>,
                private authService: AuthService,
                public gaService: GoogleAnalyticsService,
                private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log("analytics ", event.urlAfterRedirects);
                if (environment.gatracking !== '') {
                    gaService.pageView(event.urlAfterRedirects);
                }
                // (<any>window).ga('set', 'page', event.urlAfterRedirects);
                // (<any>window).ga('send', 'pageview');
            }
        });
    }


    ngOnInit() {
        this.authService.setPersistence();
        this.store.dispatch(new ReLoginRequestedAction());
    }

}
