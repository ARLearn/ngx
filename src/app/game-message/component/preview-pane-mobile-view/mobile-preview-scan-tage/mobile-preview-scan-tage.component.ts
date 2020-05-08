import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-mobile-preview-scan-tage',
    template: `


        <div class="full-with-height-container pos-scan-img">
            <app-preview-navbar></app-preview-navbar>

        </div>

    `,
    styles: [`

        .pos-scan-img {
            background: transparent url("/assets/img/scantag/ScanTag2.png") 0% 0% no-repeat padding-box;
            background-size: cover;
        }

        .text-preview {
            margin: 24px;
            margin-top: 24px;

            text-align: left;
            color: #0000008A;
        }

    `]
})
export class MobilePreviewScanTageComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
