import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {AngularFireStorage} from "angularfire2/storage";

@Component({
    selector: 'app-text-questions-gallery',
    template: `
    <div class="text-questions-gallery">
        <div *ngIf="!loading" class="wrapper">
            <mat-card class="answer" *ngFor="let res of answers">
                <mat-card-title>
                    <div class="user">
                        <div class="user__avatar">{{ res.user?.avatar }}</div>
                    </div>
                    {{ res.user?.name }} &bull; {{ res.timestamp | date }}
                </mat-card-title>
                <mat-card-content>
                    {{ res.responseValue }}
                </mat-card-content>
            </mat-card>
        </div>
        <div class="load-wrapper" *ngIf="loading">
            <span>Loading...</span>
        </div>
    </div>
    `,
    styles: [`
        .user {
            display: inline-block;
        }

        .user__avatar {
            height: 24px;
            width: 24px;
            background-color: #DFE4E6; 
            border-radius: 2px;
            line-height: 24px;
            font-size: 12px;
            text-align: center;
            margin-right: 6px;
            color: rgba(0,0,0,0.6);
        }
        
        .load-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .answer {
            box-shadow: none;
            border: 1px solid #EDEDED;
            border-radius: 0;
        }
        
        .answer .mat-card-title {
            font-size: 14px;
        }
        
        .answer .mat-card-content {
            margin-top: 20px;
            padding-left: 34px;
            font-weight: 300;
        }
        
        .wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 8px;
        }
    `]
})
export class TextQuestionsGalleryComponent implements OnInit, OnChanges {
    @Input() user: any;
    @Input() responses: any = [];
    public answers = [];
    public loading = false;
    @Output() public onLoad: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        this.loadAnswers();
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (
            (changes.responses && changes.responses.currentValue) ||
            changes.user && ((changes.user.currentValue && !changes.user.previousValue) ||
            (changes.user.currentValue && changes.user.previousValue &&
            changes.user.currentValue.fullId !== changes.user.previousValue.fullId))
        ) {
            this.loadAnswers();
        }
    }

    public loadAnswers() {
        this.loading = true;
        this.onLoad.emit(true);
        this.answers = [...this.responses];

        this.loading = false;
        this.onLoad.emit(false);
    }
}
