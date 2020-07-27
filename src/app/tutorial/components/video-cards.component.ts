import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-cards',
  template: `
    <h4 class="topic-heading primary-color">{{ category }}</h4>
    <div class="card-wrapper">
      <mat-card *ngFor="let video of videos" class="question-card" routerLink="/portal/tutorial/video/1">
        <img class="question-card-image" mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
        <mat-card-content>
          <h4 class="question-card-title">
            Webinar Serious Gaming Platform - Een initiatief van NBD Biblion
          </h4>
          <p class="question-card-meta">
            Bekijken, 7 min.
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
      `
      .topic-heading {
        padding: 14px 20px;
        margin: 50px 0 30px;
        font-weight: 400;
        background-color: rgba(62, 163, 220, 0.07);
      }
      .card-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
      }
      .question-card {
        box-shadow: none;
        border-radius: 0;
        border: 1px solid #EEEEEE;
        cursor: pointer;
      }
      .question-card-image {
        height: 180px;
        object-fit: cover;
      }
      .question-card-title {
        padding-top: 10px;
        font-size: 14px;
      }
      .question-card-meta {
        padding: 10px 0 5px;
      }
    `
  ]
})
export class VideoCardsComponent implements OnInit {
  @Input() category = 'Test';
  @Input() videos = [1, 2];

  constructor() { }

  ngOnInit(): void {
  }

}
