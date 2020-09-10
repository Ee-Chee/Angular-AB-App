import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState, AddressBookStoreActions, RootStoreSelectors } from './root-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    error$: Observable<string>;
    isLoading$: Observable<boolean>;

    constructor(private store$: Store<RootStoreState.RootState>) { }

    ngOnInit() {
        this.store$.dispatch(
            new AddressBookStoreActions.ReadDataAction()
        );

        this.error$ = this.store$.select(
            RootStoreSelectors.selectError
        );

        this.isLoading$ = this.store$.select(
            RootStoreSelectors.selectIsLoading
        ); //It is always observing the changes in store (regardless of current path/component). Render when its value changes in the store.
    }
}
