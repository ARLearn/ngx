import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTutorialComponent } from './pages/video-tutorial.component';
import { FaqTutorialComponent } from './pages/faq-tutorial.component';
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/tutorial.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TutorialEffects} from "./store/tutorial.effects";



@NgModule({
  declarations: [VideoTutorialComponent, FaqTutorialComponent],
  imports: [
    CommonModule,
    SharedModule.forChild(),
    StoreModule.forFeature('tutorial-games', reducers),
    EffectsModule.forFeature([TutorialEffects]),
  ]
})
export class TutorialModule { }
