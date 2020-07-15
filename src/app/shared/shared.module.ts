import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {reducers} from './store/shared.reducer';
import {Store, StoreModule} from '@ngrx/store';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {State} from '../core/reducers';
import {getLastError} from './store/shared.selector';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {DragDropDirective} from './directives/drag-drop-directive.directive';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../environments/environment';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ContentContainerComponent} from './component/content-container/content-container.component';
import {FilestoreBackgroundImageComponent} from "./component/filestore-background-image/filestore-background-image.component";
import {HeaderBackButtonComponent} from './component/header-back-button/header-back-button.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {TopLevelNavbarComponent} from "./component/top-level-navbar/top-level-navbar.component";
import {ConnectionTileComponent} from "./component/connection-tile/connection-tile.component";
import {FilestoreBackgroundVideoComponent} from './component/filestore-background-video/filestore-background-video.component';
import {AuthModule} from "../auth/auth.module";
import { ColorInputComponent } from './component/color-input/color-input.component';
import { ColorPickerModalComponent } from './modal/color-picker-modal/color-picker-modal.component';
import {ColorSketchModule} from "ngx-color/sketch";
import {TrucatePipe} from "./pipes/trucate-pipe";
import {DomSanitizer} from "@angular/platform-browser";
import { ModalEscButtonComponent } from './component/modal-esc-button/modal-esc-button.component';
import { SearchButtonComponent } from './component/search-button/search-button.component';
import { ScreenTileComponent } from './component/screen-tile/screen-tile.component';
import { HoverOverlayComponent } from './component/screen-tile/hover-overlay/hover-overlay.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {SelectLanguageComponent} from "./language-picker/select-language/select-language.component";
import { TopNavComponent } from './component/header-components/top-nav.component';
import { AccountSectionComponent } from './component/account/account-section.component';
import { SubtabsNavbarComponent } from "./component/subtabs-navbar/subtabs-navbar.component";
import { FileDropZoneComponent } from '../media-library/components/file-drop-zone/file-drop-zone.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('shared', reducers),
        MatSnackBarModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatPaginatorModule, MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule,
        MatChipsModule,
        AuthModule,
        MatMenuModule,

        MatGridListModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey
        }),
        ColorSketchModule
    ],

    exports: [
        CommonModule,
        TranslateModule,
        DragDropDirective,
        AgmCoreModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatPaginatorModule, MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule,
        MatMenuModule,
        ContentContainerComponent,
        FilestoreBackgroundImageComponent,
        FilestoreBackgroundVideoComponent,
        HeaderBackButtonComponent,
        MatChipsModule,
        TopLevelNavbarComponent,
        SubtabsNavbarComponent,
        ConnectionTileComponent,
        ColorInputComponent,
        TrucatePipe,
        ModalEscButtonComponent,
        SearchButtonComponent,
        ScreenTileComponent,
        SelectLanguageComponent,
        TopNavComponent,
        AccountSectionComponent,
        FileDropZoneComponent,

    ],
    entryComponents: [
        ColorPickerModalComponent
    ],
    declarations: [DragDropDirective, ContentContainerComponent, FilestoreBackgroundImageComponent,
        ConnectionTileComponent,
        HeaderBackButtonComponent, TopLevelNavbarComponent, SubtabsNavbarComponent,
        FilestoreBackgroundVideoComponent, ColorInputComponent, ColorPickerModalComponent,
        TrucatePipe,
        ModalEscButtonComponent,
        SearchButtonComponent,
        ScreenTileComponent,
        HoverOverlayComponent,
        SelectLanguageComponent,
        TopNavComponent,
        AccountSectionComponent,
        FileDropZoneComponent,
        ]
})
export class SharedModule {
    public errors$: Observable<string> = this.store.select(getLastError);

    constructor(
        private _snackBar: MatSnackBar,
        private store: Store<State>,
        private matIconRegistry: MatIconRegistry,
        private translate: TranslateService,
        private domSanitizer: DomSanitizer) {
        this.errors$.subscribe((error: any) => {
            const transException = 'eu.iothings.suwaco.exceptions.TranslatableException:';
            let toDisplay = 'Error!';
            if (error != null && error.name) {
                toDisplay = error.message + error.name;
                toDisplay = this.translate.instant('EXCEPTION.' + error.name.toUpperCase());

                // if (error.text.startsWith(transException)) {
                //   toDisplay = error.text.substr(transException.length + 1);
                //   toDisplay = this.translate.instant(toDisplay);
                // } else if (error.text.startsWith('Invalid credentials')) {
                //   toDisplay = this.translate.instant('EXCEPTION.INVALID_CREDENTIALS');
                // } else {
                //   console.log('TO translate ', error.text);
                // }
                this._snackBar.open(toDisplay, '', {
                    duration: 3000,
                    panelClass: 'my-snack-bar'
                });
            }
            // if (error != null) {
            //   this._snackBar.open(error, '', {
            //     duration: 3000,
            //     panelClass: 'my-snack-bar'
            //   });
            // }

        });
        translate.addLangs(['en', 'nl', 'de']);

        translate.setDefaultLang('nl');

        // the lang to use, if the lang isn't available, it will use the current loader to get them

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|nl|de/) ? browserLang : 'en');
        this.matIconRegistry.addSvgIcon(
            `facebook`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/facebook.svg'));
        this.matIconRegistry.addSvgIcon(
            `google`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/google.svg'));
        this.matIconRegistry.addSvgIcon(
            `image`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/image.svg'));
        this.matIconRegistry.addSvgIcon(
            `cloud`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/cloud.svg'));
        this.matIconRegistry.addSvgIcon(
            `close`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/close.svg'));
        this.matIconRegistry.addSvgIcon(
            `qrcode`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/components/qr_code.svg'));
    }

    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                TranslateModule.forRoot({loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}}).providers
            ]
        };
    }

    static forChild(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                TranslateService,
                TranslateModule.forChild({loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}}).providers
            ]
        };
    }
}
