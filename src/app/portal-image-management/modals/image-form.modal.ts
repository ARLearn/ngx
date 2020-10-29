import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Store} from "@ngrx/store";
import {State} from "../../core/reducers";
import {Subject} from "rxjs";

@Component({
    selector: 'app-upload-image',
    template: `
        <div class="maxwidth pos-top">
            <app-modal-esc-button
                    class="gl-pos-modal-esc-button"
                    [type]="'esc'" (buttonClick)="onNoClick()"></app-modal-esc-button>
            <app-modal-esc-button
                    class="gl-pos-modal-back-button"
                    [type]="'back'" (buttonClick)="onNoClick()"></app-modal-esc-button>
        </div>
        <div class="maxwidth">
            <div class="pos-title primary-color font-medium-32-43-roboto">Upload Image</div>
            
            <form class="image-form" #form="ngForm" (ngSubmit)="form.valid && onSubmit()">
                <div class="wrap">
                    <div class="form">
                        <div>
                            <mat-form-field class="field">
                                <mat-label>Name</mat-label>
                                <input type="text" matInput [(ngModel)]="image.name" name="name" required
                                       pattern="[\\w\\s]+"/>
                                <mat-error>Name is invalid</mat-error>
                            </mat-form-field>
                        </div>
                        <div>
                            <mat-form-field class="mat-form-messages add-space field">
                                <mat-chip-list #chipList aria-label="Tags selection">
                                    <mat-chip color="accent" selected
                                              *ngFor="let label of image.tags"
                                              [selectable]="false"
                                              [removable]="true"
                                              (removed)="removeTag(label)">
                                        {{label}}
                                        <mat-icon matChipRemove>cancel</mat-icon>
                                    </mat-chip>
                                    <input placeholder="Tags"
                                           [matChipInputFor]="chipList"
                                           [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                                           [matChipInputAddOnBlur]="true"
                                           (matChipInputTokenEnd)="addTag($event)">
                                </mat-chip-list>
                            </mat-form-field>
                        </div>
                    </div>

                    <div class="photo" *ngIf="imagePath; else photoPlaceholder">
                        <app-gallery-file-picker [path]="imagePath"></app-gallery-file-picker>
                    </div>
                    
                    <ng-template #photoPlaceholder>
                        <div class="photo photo-placeholder">
                            To upload an image, type in name and path
                        </div>
                    </ng-template>                    
                </div>
                
                <div class="center btn-container">
                    <button type="submit" mat-flat-button color="primary">{{ 'BTN.SUBMIT' | translate }}</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
    .pos-top {
      height: 1px;
    }
    .pos-title {
      position: relative;
      margin-top: 83px;
      height: 38px;
      text-align: center;
    }
    
    .field {
        width: 100%;
    }
    
    .btn-container {
        margin-top: 1rem;
    }
    
    .image-form {
        margin: 120px auto;
        max-width: 600px;
    }
    
    .center {
        text-align: center;
    }
    
    .wrap {
        display: flex;
    }
    
    .form {
        width: 360px;
        margin: 0 auto;
    }
    
    .photo {
        margin-left: 30px;
    }
    
    .photo-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border: 2px dashed #d5d8d9;
        color: #b6babb;
        text-align: center;
        width: 236px;
        height: 418px;
    }
    `
    ]
})
export class ImageFormModalComponent implements OnInit {
    image = {
        name: '',
        path: '',
        tags: [],
    };

    private submit$ = new Subject();

    get submit() {
        return this.submit$.asObservable();
    }

    get imagePath() {
        if (this.image.name.trim() && this.image.path.trim()) {
            return `mediaLibrary/${this.image.path.trim()}/${this.image.name.trim()}.png`;
        }

        return null;
    }

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        public dialogRef: MatDialogRef<ImageFormModalComponent>,
        public store: Store<State>
    ) {}

    ngOnInit() {

    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.submit$.next(this.image);
    }

    addTag(label: any) {
        if (!label.value) { return; }

        const tag = label.value.trim();

        if (this.image.tags.includes(tag)) {
            label.input.value = '';

            return;
        }

        if (label.input) {
            label.input.value = '';
        }

        this.image.tags = [ ...this.image.tags, tag ];
    }

    removeTag(label: any) {
        this.image.tags = this.image.tags.filter(x => x !== label);
    }
}
