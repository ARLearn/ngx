import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { VideoTutorialComponent } from './pages/video-tutorial.component';
import { FaqTutorialComponent } from './pages/faq-tutorial.component';
import { SharedModule } from "../shared/shared.module";
import { reducers } from "./store/tutorial.reducer";
import { TutorialEffects } from "./store/tutorial.effects";
import { FaqListQuestionsComponent } from './components/faq-list-questions.component';
import {QuestionComponent} from "./components/question.component";
import {VideoCardsComponent} from "./components/video-cards.component";
import {VideosTutorialComponent} from "./pages/videos-tutorial.component";



@NgModule({
  declarations: [
    VideoTutorialComponent,
    VideosTutorialComponent,
    VideoCardsComponent,
    FaqTutorialComponent,
    FaqListQuestionsComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule.forChild(),
    StoreModule.forFeature('tutorial-games', reducers),
    EffectsModule.forFeature([TutorialEffects]),
  ]
})
export class TutorialModule { }