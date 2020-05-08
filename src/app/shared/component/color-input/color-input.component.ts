import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ColorPickerModalComponent} from "../../../game-messages/modal/color-picker-modal/color-picker-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-color-input',
    template: `
        <div class="primary-color">
            <div class="color-text">{{label}}</div>
            <div class="outer-circle"></div>
            <div class="inner-circle"
                 [ngStyle]="{'background': color+' 0% 0% no-repeat padding-box'}"
                 #primButton (click)="openPicker()"></div>
            <div class="color-rep">{{color}}</div>
        </div>
    `,
    styles: [`
        .primary-color {
            position: absolute;
            width: 161px;
            height: 59px;
            /*background-color: blue;*/
        }

        .outer-circle {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 34px;
            height: 34px;

            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #D3D6D7;
            border-radius: 20px;
            opacity: 1;
        }


        .inner-circle {
            position: absolute;
            bottom: 7px;
            left: 7px;
            width: 22px;
            height: 22px;
            /*background: #D61081 0% 0% no-repeat padding-box;*/
            border-radius: 20px;
            opacity: 1;
        }

        .color-rep {
            position: absolute;
            width: 112px;
            left: 49px;
            bottom: 9px;

            text-align: left;
            font: Regular 14px/20px Roboto;
            letter-spacing: 0;
            color: #000000;
            text-transform: uppercase;
            opacity: 1;
        }

        .color-text {
            position: absolute;
            top: 0px;
            left: 0px;

            text-align: left;
            font: Regular 12px/16px Roboto;
            letter-spacing: 0;
            color: #0000008A;
            opacity: 1;
        }
    `]
})
export class ColorInputComponent implements OnInit {
    @ViewChild('primButton') public primButtonRef: ElementRef;

    @Input() color;
    @Input() label;
    @Input() canEdit = false;
    @Input() unselect = false;
    @Output() onChange = new EventEmitter<string>();

    constructor(
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
    }

    openPicker() {
        if (this.canEdit) {
            const dialogRef = this.dialog.open(ColorPickerModalComponent, {
                panelClass: 'white-picker-panel',
                width: '250px',
                data: {
                    positionRelativeToElement: this.primButtonRef,
                    unselect: this.unselect
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    console.log("default ", result.default);
                    if (result.default) {
                        console.log("default selected");
                        this.onChange.emit("default");
                    } else {
                        this.color = result.color;
                        this.onChange.emit(this.color);
                    }

                }
            });
        }

    }

}
