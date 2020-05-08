import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-top-level-navbar',
    template: `
        <div class="header primary-background-color">
            <div class="maxwidth">
                <div class="root-tabs">
                    <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                        <a
                                class="uppercase"
                                mat-tab-link
                                routerLinkActive #rla="routerLinkActive"
                                [active]="rla.isActive"
                                [routerLink]="'/portal/root/games'">Mijn games</a>
                        <a mat-tab-link
                           routerLinkActive #rla1="routerLinkActive"
                           [active]="rla1.isActive"
                           [routerLink]="'/portal/root/connections'"
                        > Connecties </a>
                        <a mat-tab-link
                           disabled routerLinkActive="tab-selected"> Game Library </a>
                    </nav>
                </div>
                <div class="account-dropdown">
                    <app-user-drop-down-display></app-user-drop-down-display>
                </div>

                <div class="game-title font-medium-32-43-roboto ">{{title}}</div>
                <ng-content></ng-content>
            </div>
        </div>

    `,
    styleUrls: ['./top-level-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TopLevelNavbarComponent implements OnInit {

    @Input() title;

    constructor() {
    }

    ngOnInit() {
    }

}
