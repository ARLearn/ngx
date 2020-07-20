import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTutorialComponent } from './pages/video-tutorial.component';
import { FaqTutorialComponent } from './pages/faq-tutorial.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [VideoTutorialComponent, FaqTutorialComponent],
  imports: [
    CommonModule,
    SharedModule.forChild()
  ]
})
export class TutorialModule { }
