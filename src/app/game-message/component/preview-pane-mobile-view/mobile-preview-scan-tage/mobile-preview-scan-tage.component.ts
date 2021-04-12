import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GameMessage } from "../../../../game-messages/store/game-messages.state";
import {getFilteredMessagesSelector, getMessagesSelector, getQrCodesSelector, getCurrentGameMessages} from "../../../../game-messages/store/game-messages.selector";
import { Store } from "@ngrx/store";
import { State } from "../../../../core/reducers";

interface QrCodeAction {
    action: string;
}

@Component({
    selector: 'app-mobile-preview-scan-tag',
    template: `
        <div class="full-with-height-container pos-scan-img">
            <app-preview-navbar></app-preview-navbar>
        </div>

        <div class="qr-previews">
            <div class="qr-demo-line" *ngFor="let qr of (qrCodes$ | async)">
                <div class="qr-label font-regular-14-19-roboto"> {{ qr.action }}</div>
                <div class="hide" [ngClass]="qr.action" #el>
                    <qr-code [value]="qr.action" [size]="100"></qr-code>
                </div>
                <div class="round-button"
                     (click)="copyImage(qr.action, el)"
                     matTooltip="Copy QR code"
                     matTooltipPosition="below"
                >
                    <mat-icon class="qr-icon" svgIcon="qrcode"></mat-icon>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .hide {
            visibility: hidden;
        }
        .pos-scan-img {
            background: transparent url("/assets/img/scantag/ScanTag2.png") 0% 0% no-repeat padding-box;
            background-size: cover;
        }

        .qr-previews {
            position: relative;
            top: 40px;
        }
        
        /*.text-preview {*/
        /*    margin: 24px;*/
        /*    margin-top: 24px;*/
        /*    text-align: left;*/
        /*    color: #0000008A;*/
        /*}*/

        .preview-title {
            font: Bold 20px/24px Gentium Basic;
            padding: 20px 0;
            margin-bottom: 30px;
            border-bottom: 1px solid #E0E0E0;
        }
        .qr-demo-line {
            /*width: 259px;*/
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
            /*font-size: 17px;*/
            color: #BEC3C4;
            padding: 4px;
            /*height: 100%;*/
            /*width: 100%;*/
        }

        .qr-icon svg .a {
            opacity: 1;
        }

    `],
    encapsulation: ViewEncapsulation.None
})
export class MobilePreviewScanTageComponent implements OnInit {

    @Input() hideControls = false;

    //public messages$: Observable<GameMessage[]> = this.store.select(getMessagesSelector);
    public messages$: Observable<GameMessage[]> = this.store.select(getCurrentGameMessages);
    public qrCodes$: Observable<QrCodeAction[]> = this.store.select(getQrCodesSelector);

    constructor(private http: HttpClient, public store: Store<State>) {
    }

    ngOnInit(): void {
    }

    async copyImage(type: string, el) {
        try {
            const img = el.querySelector(`img`);
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
