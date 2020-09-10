import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AddressBookStoreSelectors } from './address-book-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    AddressBookStoreSelectors.selectRequestError,
    (addressBookError: string) => {
        return addressBookError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    AddressBookStoreSelectors.selectRequetIsLoading,
    (loading: boolean) => {
        return loading;
    }
);