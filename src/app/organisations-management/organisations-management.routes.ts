import {OrganisationsListComponent} from "./pages/organisations-list.component";
import {OrganisationPageComponent} from "./pages/organisation-page.component";


export const organisationRoutes = {
    path: 'organisations',
    children: [
        {path: '', component: OrganisationsListComponent, pathMatch: 'full'},
        {path: ':organisationId', component: OrganisationPageComponent, pathMatch: 'full'}
    ]
};
