import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserAddress } from '../../interfaces/address-interfaces';

export const addressBookAdapter: EntityAdapter<UserAddress> = createEntityAdapter<UserAddress>({
    selectId: userAddress => userAddress.id,
    sortComparer: (a: UserAddress, b: UserAddress): number => a.firstname.localeCompare(b.firstname)
});

export interface State extends EntityState<UserAddress> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: State = addressBookAdapter.getInitialState(
    {
        isLoading: false,
        error: null
    }
);