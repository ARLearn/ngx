import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-content-container',
    template: `
        <div class="maxwidth">
            todo remove app-content-container
<!--            <ng-content></ng-content>-->
        </div>
    `
})
export class ContentContainerComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
