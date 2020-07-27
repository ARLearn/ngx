import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question',
  template: `      
    <div class="question" [class.opened]="isOpened">
      <mat-icon class="arrow" color="primary">arrow_downward</mat-icon>
      <p class="question-text" (click)="toggle()">
        {{ question.name }}
      </p>

      <div *ngIf="isOpened" class="question-answer" [innerHTML]="question.richText"></div>
    </div>
  `,
  styles: [
      `        
    .question {
      position: relative;
      border-bottom: 1px solid #F0F0F0;
     }
    
    .question-text {
      font-size: 18px;
      padding: 15px 50px 15px 20px;
      font-weight: 500;
      margin: 0;
      cursor: pointer;
    }
    .question-answer {
      padding: 15px 20px;
      margin-top: 10px;
    }
    .question .arrow {
      position: absolute;
      top: 15px;
      right: 20px;
      pointer-events: none;
      
      transition: all 0.15s linear;
    }
        
    .question.opened .arrow {
      transform: rotate(180deg);
    }
    `
  ]
})
export class QuestionComponent implements OnInit {
  isOpened = false;

  @Input() question;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

}
