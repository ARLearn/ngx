import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tutorial',
  template: `
    <app-top-level-navbar [title]="'Help'">
      <app-subtabs-navbar [items]="subMenuItems"></app-subtabs-navbar>
    </app-top-level-navbar>
    <div class="bg-white">
      <div class="maxwidth content">
        <div class="back-content">
          <button class="btn-back" mat-stroked-button color="primary" routerLink="/portal/tutorial/video">{{ 'BACK' | translate }}</button>
        </div>
        <main class="main">
          <div class="main-content">
            <h2 class="title">Webinar Serious Gaming Platform Een initiatief van NBD Biblion</h2>
            <p>Bekijken, 7 min.</p>

            <div class="video">
              <video id='video' controls="controls" preload='none'
                     poster="http://media.w3.org/2010/05/sintel/poster.png">
                <source id='mp4' src="http://media.w3.org/2010/05/sintel/trailer.mp4" type='video/mp4' />
                <source id='webm' src="http://media.w3.org/2010/05/sintel/trailer.webm" type='video/webm' />
                <source id='ogv' src="http://media.w3.org/2010/05/sintel/trailer.ogv" type='video/ogg' />
                <p>Your user agent does not support the HTML5 Video element.</p>
              </video>
            </div>

            <article class="article">
              <h5 class="article-title">Tussenkopje lorum ipsim dolor sit amet</h5>

              <p class="article-body">Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorum ipseum dolor sit amet. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolorauctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </article>
          </div>
          
          <div class="meta">
            <span class="meta-item">Terug near: <a class="primary-color" routerLink="/portal/tutorial/video">Introductie</a></span>
            <span class="meta-item">Volgende: <a class="primary-color" routerLink="/portal/tutorial/video">Een account aanmaken</a></span>
          </div>
          
          <div class="main-content">
            <app-video-cards></app-video-cards>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
      .btn-back {
        border-color: currentColor;
        width: 100%;
      }
      
      .back-content {
        margin-top: 10px;
      }
      
      .back-content button {
        width: 84px;
      }
      
      .content {
        display: flex;
        align-items: flex-start;
        padding-top: 64px;
      }

      .main {
        margin-bottom: 100px;
      }
      
      .main-content {
        padding: 0 84px;
      }
      
      .title {
        font-weight: 700;
        margin-bottom: 30px;
        line-height: 48px;
      }
      
      .video video {
        width: 100%;
      }
      
      .meta {
        padding: 40px 0;
        text-align: center;
        border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        font-weight: 500;
      }

      .meta > * {
        padding: 0 15px;
      }
      .meta-item:first-child {
        border-right: 1px solid #000000;
      }
      
      .video {
        margin: 50px 0 75px;
      }
      
      .article {
        padding-bottom: 40px;
      }
      
      .article-title {
        margin-bottom: 20px;
      }
      
      .article-body {
        line-height: 24px;
      }
  `]
})
export class VideoTutorialComponent implements OnInit {
  subMenuItems = [
    {
      routerLink: '/portal/tutorial/video',
      label: 'HELP.VIDEO_INSTRUCTIONS'
    },
    {
      routerLink: '/portal/tutorial/faq',
      label: 'HELP.QUESTIONS'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
