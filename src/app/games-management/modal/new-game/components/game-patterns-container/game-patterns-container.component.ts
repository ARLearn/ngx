import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-game-patterns-container',
    template: `
        <div class="flex-parent">
            <app-new-game-pattern-tile class="flex-game-pattern-tile"
                                       title="Spoorzoeker"
                                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                       templateId="Spoorzoeker"

            ></app-new-game-pattern-tile>
            <app-new-game-pattern-tile class="flex-game-pattern-tile"
                                       title="Decision"
                                       templateId="Decision"
                                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></app-new-game-pattern-tile>

            <app-new-game-pattern-tile class="flex-game-pattern-tile"
                                       title="Adventure "
                                       templateId="Adventure"
                                       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ></app-new-game-pattern-tile>
        </div>
    `,
    styles: [`
        :host {
            position: absolute;
            margin-top: 38px;
            width: 100%;
        }

        .flex-parent {
            position: relative;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-flow: wrap;
            justify-content: space-between;

            align-content: flex-start;
            /*margin-top: 38px;*/
            padding-bottom: 20px;
        }


        .flex-game-pattern-tile {
            position: relative;
            width: 320px;
            height: 270px;
            margin-bottom: 16px;

        }

        .flex-game-pattern-tile:hover {
            position: relative;
            width: 320px;
            height: 270px;

            background: #ffffff 0% 0% no-repeat padding-box;
            opacity: 1;
            box-shadow: 0px 19px 38px #00000042;
        }
    `]
})
export class GamePatternsContainerComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
