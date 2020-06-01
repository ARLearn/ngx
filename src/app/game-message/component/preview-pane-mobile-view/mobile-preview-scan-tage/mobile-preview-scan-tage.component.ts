import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-mobile-preview-scan-tag',
    template: `

        <div class="full-with-height-container pos-scan-img">
            <app-preview-navbar></app-preview-navbar>
        </div>

        <div class="qr-previews">

            <div class="d-none">
                <qr-code [value]="'icebear'" [size]="100"></qr-code>
                <qr-code [value]="'elephant'" [size]="100"></qr-code>
            </div>

            <div class="qr-demo-line">
                <div class="qr-label font-regular-14-19-roboto"> Icebear</div>
                <div class="round-button"
                     (click)="copyImage('icebear')"
                     matTooltip="Copy QR code"
                     matTooltipPosition="below"
                >
                    <mat-icon class="qr-icon" svgIcon="qrcode"></mat-icon>
                </div>
            </div>
            <div class="qr-demo-line">
                <div class="qr-label font-regular-14-19-roboto"> Elephant</div>
                <div class="round-button"
                     (click)="copyImage('elephant')"
                     matTooltip="Copy QR code"
                     matTooltipPosition="below"
                >

                    <mat-icon class="qr-icon" svgIcon="qrcode"></mat-icon>
                </div>

            </div>
            <button [cdkCopyToClipboard]="'test test'">Copy text clipboard</button>
            
            <div>how to copy an image to clipboard. Eg. http://qrfree.kaywa.com/?l=1&s=8&d=elephant representing "elephant"</div>

        </div>
    `,
    styles: [`
        .pos-scan-img {
            background: transparent url("/assets/img/scantag/ScanTag2.png") 0% 0% no-repeat padding-box;
            background-size: cover;
        }

        /*.text-preview {*/
        /*    margin: 24px;*/
        /*    margin-top: 24px;*/
        /*    text-align: left;*/
        /*    color: #0000008A;*/
        /*}*/

        .qr-previews {
            position: absolute;
            top: 550px
        }

        .qr-demo-line {
            width: 259px;
            height: 32px;
            opacity: 1;
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .qr-label {
            padding-top: 5px;
            color: #000000DE;
        }

        .round-button {
            width: 32px;
            height: 32px;
            border: 1px solid #D3D6D7;
            border-radius: 100px;
            opacity: 1;
            cursor: pointer;
        }

        .qr-icon {
            font-size: 17px;
            color: #BEC3C4;
            padding: 4px;
            height: 100%;
            width: 100%;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class MobilePreviewScanTageComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    async copyImage(type: 'elephant' | 'icebear') {
        try {
            const img = document.querySelector('.qr-previews [ng-reflect-value="'+ type +'"] img');
            const imgURL = img.getAttribute('src');
            const data = await fetch(imgURL);
            const blob = await data.blob();
            // @ts-ignore
            await navigator.clipboard.write([
                // @ts-ignore
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
        } catch (err) {
            console.error(err.name, err.message);
        }
    }

}
