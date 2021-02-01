import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationsListComponent } from './pages/organisations-list.component';
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";

import {EffectsModule} from "@ngrx/effects";
import {organisationReducer} from "./store/organisations.reducer";
import {OrganisationsEffects} from "./store/organisations.effects";
import { OrganisationTableComponent } from './components/organisation-table.component';
import { AddOrganizationDialogComponent } from './components/add-organization-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OrganisationPageComponent } from './pages/organisation-page.component';
import {PortalUserManagementModule} from "../portal-user-management/portal-user-management.module";




@NgModule({
  declarations: [OrganisationsListComponent, OrganisationTableComponent, AddOrganizationDialogComponent, OrganisationPageComponent],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('organisation-management', organisationReducer),
        EffectsModule.forFeature([OrganisationsEffects]),
        ReactiveFormsModule,
        PortalUserManagementModule,
    ]
})
export class OrganisationsManagementModule {

}
