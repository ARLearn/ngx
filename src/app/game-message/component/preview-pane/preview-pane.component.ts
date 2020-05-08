import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-preview-pane',
    template: `        
        <div class="preview-pane">
            <app-preview-pane-header></app-preview-pane-header>
        </div>

        <div class="preview-pane">
            <app-preview-pane-mobile-view></app-preview-pane-mobile-view>
        </div>
    `,
    styles: [`
        .preview-pane {
            position: relative;
            width: 100%;
        }
    `]
})
export class PreviewPaneComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
