import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "../../../../environments/environment";


@Component({
    selector: 'app-top-level-navbar',
    template: `
        <div class="header primary-background-color">
            <div class="maxwidth">
                <app-top-nav></app-top-nav>
                <app-account-section></app-account-section>

                <div class="back-button" *ngIf="backUrl">
                    <app-header-back-button [route]="backUrl"></app-header-back-button>
                </div>
                <div class="title font-medium-32-43-roboto ">{{title}}</div>
                <ng-content></ng-content>
            </div>
        </div>

    `
})
export class TopLevelNavbarComponent implements OnInit {

    @Input() title;
    @Input() backUrl = null;

    constructor() {
    }

    ngOnInit() {
    }

}
