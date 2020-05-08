import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-back-button',
    template: `
        <div class="button-area" (click)="clicked()">
            <div class="vertical-bar"></div>
            <div class="arrow-left">
                <mat-icon class="arrow-icon">keyboard_arrow_left</mat-icon>
            </div>
        </div>
    `,
    styleUrls: ['./header-back-button.component.css']
})
export class HeaderBackButtonComponent implements OnInit {

    @Output() onClicked = new EventEmitter<any>();
    @Input() route;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    clicked() {
        this.onClicked.emit();
        if (this.route) {
            this.router.navigate([this.route]);
        }
    }
}
