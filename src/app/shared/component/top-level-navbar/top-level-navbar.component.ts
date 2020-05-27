import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "../../../../environments/environment";


@Component({
    selector: 'app-top-level-navbar',
    template: `
        <div class="header primary-background-color">
            <div class="maxwidth">
                <app-top-nav></app-top-nav>
                <app-account-section></app-account-section>


                <div class="game-title font-medium-32-43-roboto ">{{title}}</div>
                <ng-content></ng-content>
            </div>
        </div>

    `,
    styles: [`
        .header {
            top: 0px;
            right: 307px;
            width: 100%;
            height: 144px;
            opacity: 1;
        }

        .game-title {
            top: 60px;
            height: 38px;
            text-align: left;
            letter-spacing: 0;
            color: #FFFFFF;

            position: absolute;
            z-index: 2;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class TopLevelNavbarComponent implements OnInit {

    @Input() title;

    constructor() {
    }

    ngOnInit() {
    }

}
