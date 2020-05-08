import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-modal-esc-button',
    template: `
        <div class="cursor-pointer font-medium-9-20-roboto pos-container primary-color style-local" (click)="buttonClick.emit()">
            <mat-icon class="pos-icon">{{icon_mapping[type]}}</mat-icon>
          <div  class="pos-label">{{ label_mapping[type] | translate }}</div>
        </div>`,
    styles: [`
        .pos-container {
            position: absolute;
        }
        
        .pos-icon{
          position: relative;
        }
        
        .pos-label{
          position: relative;
          margin-top: -9px;
        }
        .style-local {
          opacity: 0.7;
        }
    `]
})
export class ModalEscButtonComponent implements OnInit {

    @Input() type: 'back' | 'esc';

    @Output() buttonClick = new EventEmitter();

    icon_mapping = {
        'back': 'arrow_back',
        'esc': 'close'
    };
    label_mapping = {
        'back': 'ACTIONS.BACK',
        'esc': 'ACTIONS.ESC'
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
