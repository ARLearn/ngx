import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "../../../../environments/environment";


@Component({
    selector: 'app-subtabs-navbar',
    template: `
        <div class="subtabs">
            <nav mat-tab-nav-bar [backgroundColor]="'primary'">
                <a mat-tab-link
                   *ngFor="let item of items"
                   routerLinkActive #rla="routerLinkActive"
                   [active]="rla.isActive"
                   [routerLink]="item.routerLink">{{ item.label |translate}}</a>
            </nav>
        </div>
    `,
    styles: [`
        .subtabs {
            position: absolute;
            top: 96px;
            
            width: 100%;
        }

        ::ng-deep .mat-tab-links .mat-tab-link {
            min-width: unset;
            padding: 0;
            margin-right: 30px;
            text-decoration: none;
            text-transform: uppercase;
        }

        .mat-tab-label-active {
            opacity: 1;
        }
    `],
    // encapsulation: ViewEncapsulation.None
})
export class SubtabsNavbarComponent implements OnInit {

    @Input() title;

    @Input() items: {
        routerLink: string;
        label: string;
    }[];

    constructor() {
    }

    ngOnInit() {
    }

}
