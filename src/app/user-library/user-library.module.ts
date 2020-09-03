import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLibraryUserComponent } from './pages/game-library-user.component';
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/user-library.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UserLibraryEffects} from "./store/user-library.effects";
import { FeaturedBannerComponent } from './components/featured-banner.component';


@NgModule({
  declarations: [GameLibraryUserComponent, FeaturedBannerComponent],
    imports: [
        CommonModule,
        SharedModule.forChild(),
        StoreModule.forFeature('gameLibrary', reducers),
        EffectsModule.forFeature([UserLibraryEffects]),

    ]
})
export class UserLibraryModule { }
