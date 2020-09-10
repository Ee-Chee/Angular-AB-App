import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserAddress } from '../../interfaces/address-interfaces';
import { addressBookAdapter, State } from './state';

export const getError = (state: State): string => state.error;

export const getIsLoading = (state: State): boolean => {
    // console.log("entity state", state);
    return state.isLoading;
}

export const selectAddressBookState: MemoizedSelector<object, State> = createFeatureSelector<State>('addressBook');

export const selectAllUserAddresses: (state: object) =>
    UserAddress[] = addressBookAdapter.getSelectors(selectAddressBookState).selectAll;

export const selectUserAddressById = (id: string) =>
    createSelector(selectAllUserAddresses, (userAddresses: UserAddress[]) => {
        let foundUserAddress: UserAddress = userAddresses.find(elem => elem.id == id);
        //if id not found
        if (foundUserAddress === undefined) {
            return null; //handle invalid id input, non-existing id, empty data array during data retrieving process and zero-registered-user array
        } else { //handle valid, found id and rerendering as data retrieved in store
            return foundUserAddress;
        }
    });

export const selectRequestError: MemoizedSelector<object, any> = createSelector(
    selectAddressBookState,
    getError
);

export const selectRequetIsLoading: MemoizedSelector<object, boolean> = createSelector(
    selectAddressBookState,
    getIsLoading
);