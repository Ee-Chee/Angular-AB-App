import { Actions, ActionTypes } from './actions';
import { addressBookAdapter, initialState, State } from './state';

export function addressBookReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.READ_DATA: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.READ_SUCCESS: {
            return addressBookAdapter.addAll(action.payload.items, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.REQUEST_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.UPDATE_INFO: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.UPDATE_SUCCESS: {
            return addressBookAdapter.setOne(action.payload.item, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.DELETE_USER: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.DELETE_SUCCESS: {
            return addressBookAdapter.removeOne(action.payload.id, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.CREATE_USER: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.CREATE_SUCCESS: {
            return addressBookAdapter.addOne(action.payload.item, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        default: {
            return state;
        }
    }
}