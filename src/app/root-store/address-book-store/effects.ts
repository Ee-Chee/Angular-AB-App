import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserAddress } from '../../interfaces/address-interfaces';
import { FirebaseService } from '../../services/firebase.service';
import * as addressBookActions from './actions';

@Injectable()
export class AddressBookStoreEffects {

    constructor(private firebaseService: FirebaseService, private actions$: Actions) { }

    @Effect()
    readDataEffect$: Observable<Action> = this.actions$.pipe(
        ofType<addressBookActions.ReadDataAction>(addressBookActions.ActionTypes.READ_DATA),
        switchMap(() =>
            this.firebaseService.getUserAddresses().pipe(
                map(metaDataCollection => {
                    // console.log(metaDataCollection);
                    const items: UserAddress[] = metaDataCollection.map(document => {
                        const data = document.payload.doc.data();
                        const id = document.payload.doc.id;
                        return { id, ...data as UserAddress };
                        //payload.doc.id; //id of collection's document
                        //as UserAddress because spread with a generic type isnt supported
                    });
                    return new addressBookActions.ReadSuccessAction({ items })
                }),
                catchError(
                    error => observableOf(new addressBookActions.RequestFailureAction({ error }))
                )
            )
        )
    );

    @Effect()
    updateInfoEffect$: Observable<Action> = this.actions$.pipe(
        ofType<addressBookActions.UpdateInfoAction>(addressBookActions.ActionTypes.UPDATE_INFO),
        switchMap(action =>
            this.firebaseService.updateUserInfo(action.payload.item).then(() =>
                new addressBookActions.UpdateSuccessAction({ item: action.payload.item })
            ).catch(
                error => new addressBookActions.RequestFailureAction({ error })
            )
        )
    );
    //unlike createUserEffect, action.payload.item contains already id (passed when user updates the form).

    @Effect()
    createUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<addressBookActions.CreateUserAction>(addressBookActions.ActionTypes.CREATE_USER),
        switchMap(action =>
            this.firebaseService.createUserAddress(action.payload.item).then(
                (docRef) => {
                    const item: UserAddress = { id: docRef.id, ...action.payload.item }
                    //console.log("item", item); //Entity state != firestore collection data.
                    //Must provide id before updating the entity state
                    return new addressBookActions.CreateSuccessAction({ item })
                }
            ).catch(
                error => new addressBookActions.RequestFailureAction({ error })
            )
        )
    );

    @Effect()
    deleteUserEffect$: Observable<Action> = this.actions$.pipe(
        ofType<addressBookActions.DeleteUserAction>(addressBookActions.ActionTypes.DELETE_USER),
        switchMap(action =>
            this.firebaseService.deleteUserAddress(action.payload.id).then(() =>
                new addressBookActions.DeleteSuccessAction({ id: action.payload.id })
            ).catch(
                error => new addressBookActions.RequestFailureAction({ error })
            )
        )
    );
}
