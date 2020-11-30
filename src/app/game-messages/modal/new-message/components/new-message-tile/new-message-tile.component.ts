import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-new-message-tile',
    template: `
        <div class="message-container">
            <div class="image-container">
                <img class="image" src="/assets/images/schermen/{{screenId}}.png"/>
            </div>
            <div class="title font-regular-16-20-roboto">{{title | translate }}</div>
        </div>

    `,
    styles: [`
        .message-container {
            width: 236px;
            height: 209px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
        }

        .image-container {
            position: relative;
            margin-top: 10px;
            
            width: 100%;
            height: 209px;
            background: #FFFFFF 0% 0% no-repeat padding-box;
        }

        .image {
            position: absolute;
            left: 50%;
            top: 50%;

            transform: translate(-50%, -50%);
        }

        .title {
            position: relative;
            bottom: 30px;
            width: 100%;
            text-align: center;
            letter-spacing: 0;
            color: #000000DE;

        }
    `]
})
export class NewMessageTileComponent implements OnInit {
    @Input() title;
    @Input() screenId;

    constructor() {
    }

    ngOnInit() {
    }

}
