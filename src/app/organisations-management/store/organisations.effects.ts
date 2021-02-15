import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {State} from "../../core/reducers";

import {catchError, map, mergeMap, switchMap, withLatestFrom} from "rxjs/operators";
import {
    AddAll, AddOne,
    CreateOrganisation,
    CreateOrganisationError,
    DeleteOrganizationRequest, DeleteOrganizationResponse,
    OrganisationActionTypes,
    Query, UpdateOrganisationExpirationAction
} from "./organisations.actions";
import {AccountService} from "../../core/services/account.service";
import {DeleteAccountRequest, DeleteAccountResponse, PortalUserActionTypes} from "../../portal-user-management/store/portal-users.actions";
import {gameIdSelector, organisationIdSelector} from "../../core/selectors/router.selector";
import {Router} from "@angular/router";

@Injectable()
export class OrganisationsEffects {

    @Effect() createOrganisation$: Observable<Action> = this.actions$.pipe(
        ofType(OrganisationActionTypes.CREATE_ORGANISATION),
        switchMap((action: CreateOrganisation) => {
            return this.accounts.createOrganisation(action.organisation).pipe(
                map(org => {
                    return new AddOne(org);
                }),
                catchError(() => of(new CreateOrganisationError(`Can't create this organisation, please, check your data!`)))
            );
        }),
    );

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType(OrganisationActionTypes.QUERY),
        switchMap((action: Query) => {
            return this.accounts.listOrganizations();
        }),
        map(arr => {
            return new AddAll(arr);
        })
    );

    @Effect() queryOne$: Observable<Action> = this.actions$.pipe(
        ofType(OrganisationActionTypes.QUERY_ONE),
        withLatestFrom(
            this.store$.select(organisationIdSelector)
        ),
        switchMap(([action, organisationId]: [Query, string]) => {
            return this.accounts.getOrganization(organisationId);
        }),
        map(arr => {
            return new AddAll([arr]);
        })
    );

    @Effect() deleteOrganization: Observable<Action> = this.actions$.pipe(
        ofType(OrganisationActionTypes.DELETE_ORGANISATION),
        mergeMap((action: DeleteOrganizationRequest) => {
            return this.accounts.deleteOrganisation(action.id);
        }),
        map(arr => {
            return new DeleteOrganizationResponse(arr);
        })
    );

    @Effect() updateExpiration: Observable<Action> = this.actions$.pipe(
        ofType(OrganisationActionTypes.UPDATE_ORGANISATION_EXPIRATION),
        mergeMap((action: UpdateOrganisationExpirationAction) => {
            return this.accounts.updateOrganisationExpiration(action.organisation.id, action.organisation.expirationDate);
        }),
        map(arr => {
            return new AddAll([arr]);
        })
    );


    constructor(private actions$: Actions,
                private store: Store<State>,
                private accounts: AccountService,
                private store$: Store<State>
    ) {
    }
}
