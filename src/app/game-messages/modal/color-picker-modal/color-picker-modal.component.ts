import {Component, ElementRef, EventEmitter, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ColorEvent} from "ngx-color";

@Component({
    selector: 'app-color-picker-modal',
    template: `
        <color-sketch class="sketch-class"
                      (onChange)="handleChange($event)"></color-sketch>
        <button mat-button (click)="selectColor()">Selecteer</button>
        <button mat-button (click)="unselectColor()">Default</button>
    `,
    styles: [`
        .sketch-class > div.sketch-picker {
            border-radius: 0px;
        !important;
            padding: 0px 0px 0;
            box-sizing: initial;
            background: transparent;

            box-shadow: none;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class ColorPickerModalComponent implements OnInit {
    private positionRelativeToElement: ElementRef;
    unselect: boolean;
    color: string;

    onColorSelect = new EventEmitter<string>();

    constructor(
        public dialogRef: MatDialogRef<ColorPickerModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log("pos", data.positionRelativeToElement);
        this.positionRelativeToElement = data.positionRelativeToElement;
        this.unselect = data.unselect;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        const matDialogConfig = new MatDialogConfig();
        const rect: DOMRect = this.positionRelativeToElement.nativeElement.getBoundingClientRect();
        matDialogConfig.position = {left: `${rect.x + 10}px`, top: `${rect.y + 25}px`};
        this.dialogRef.updatePosition(matDialogConfig.position);
    }

    handleChange($event: ColorEvent) {
        this.color = $event.color.hex;

        this.onColorSelect.emit(this.color);
    }

    selectColor() {
        this.dialogRef.close({color: this.color, default: false});
    }

    unselectColor() {
        this.dialogRef.close({default: true});
    }
}
