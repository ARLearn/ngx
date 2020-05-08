import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-new-game-pattern-tile',
    template: `
        <div class="image-container">
            <img class="image" src="/assets/images/gameTemplates/{{templateId}}.png"/>
        </div>
        <div class="title font-medium-16-21-roboto">{{title}}</div>
        <div class="description font-regular-14-19-roboto">{{description}}</div>
    `,
    styles: [`
      .image-container {
        position: absolute;
        top: 10px;
        width: 100%;
        height: 146px;

      }
      .image {
          position: absolute;
          left:50%;
          top:50%;

          transform: translate(-50%, -50%);
      }
      .title {
        position: absolute;
        bottom: 67px;
        width: 100%;

        text-align: center;
        letter-spacing: 0;
        color: #000000;
        opacity: 1;

      }

      .description {
        position: absolute;
        bottom:18px;
        width: 246px;
        left: 37px;
        text-align: center;

        letter-spacing: 0;
        color: #000000;
        opacity: 0.54;
      }


      :host {
        background: #ffffff 0% 0% no-repeat padding-box;
        opacity: 1;
      }


    `]
})
export class NewGamePatternTileComponent implements OnInit {
    @Input() title;
    @Input() description;
    @Input() templateId;

    constructor() {
    }

    ngOnInit() {
    }

}
