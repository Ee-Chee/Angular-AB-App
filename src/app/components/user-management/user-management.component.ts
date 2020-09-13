import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment from 'moment'; //make date formatting easier
import { RootStoreState, AddressBookStoreActions, AddressBookStoreSelectors } from '../../root-store';

import { UserAddress } from '../../interfaces/address-interfaces';
import * as postcodesData from '../../../assets/postcodes.de.json';

export const DateFormats = {
    parse: {
        dateInput: ['DD.MM.YYYY']
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
    minDate: Date;
    maxDate: Date;
    userDetailsForm: FormGroup;
    addressFormGroup: FormGroup;
    cities: string[];
    // disableCityControl: boolean = true;
    filteredPostcodes: Observable<string[]>;
    mappedFormObject: UserAddress;
    toggleUpdateDelete: Boolean = false;

    genders = [
        "Other",
        "Male",
        "Female"
    ];

    validationMessages = {
        'firstname': [
            { type: 'required', message: 'Firstname is required' },
            { type: 'minlength', message: 'Firstname must be at least 2 characters long' },
            { type: 'maxlength', message: 'Firstname cannot be more than 20 characters long' },
            { type: 'pattern', message: 'Your firstname must contain only letters' }
        ],
        'lastname': [
            { type: 'required', message: 'Lastname is required' },
            { type: 'minlength', message: 'Lastname must be at least 2 characters long' },
            { type: 'maxlength', message: 'Lastname cannot be more than 20 characters long' },
            { type: 'pattern', message: 'Your lastname must contain only letters' }
        ],
        'gender': [
            { type: 'required', message: 'Please select your gender' },
        ],
        'birthday': [
            { type: 'required', message: 'Please insert your birthday' },
        ],
        'street': [
            { type: 'required', message: 'Street-name is required' },
            { type: 'minlength', message: 'Must be at least 5 characters long' },
            { type: 'maxlength', message: 'Cannot be more than 20 characters long' },
            { type: 'pattern', message: 'Must contain only letters' }
        ],
        'number': [
            { type: 'required', message: 'House number is required' },
            { type: 'pattern', message: 'Must contain only positive numbers' }
        ],
        'postcode': [
            { type: 'required', message: 'Postcode is required' },
            { type: 'minlength', message: 'Must be a 5-digit number' },
            { type: 'maxlength', message: 'Must be a 5-digit number' },
            { type: 'pattern', message: 'Must contain only numbers' },
            { type: 'notFound', message: 'Postcode not found' }
        ],
        'city': [
            { type: 'required', message: 'City is required' }
        ]
    }

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private store$: Store<RootStoreState.RootState>) {
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 120, 0, 1);
        this.maxDate = new Date(currentYear - 1, 11, 31);
    }

    ngOnInit(): void {
        this.createForm(); //form must be created first

        if (this.route.snapshot.paramMap.get('id')) {
            this.store$.select(
                AddressBookStoreSelectors.selectUserAddressById(this.route.snapshot.paramMap.get('id'))
            ).subscribe(result => {
                if (result !== null) {
                    const splitBirthdayInt = result.birthday.split(".").map(elem => parseInt(elem));
                    this.userDetailsForm.patchValue({
                        firstname: result.firstname,
                        lastname: result.lastname,
                        gender: result.gender,
                        birthday: moment(new Date(splitBirthdayInt[2], splitBirthdayInt[1] - 1, splitBirthdayInt[0])),
                        address: {
                            street: result.address.street,
                            number: result.address.number,
                            postcode: result.address.postcode,
                            city: result.address.city
                        }
                    });
                    this.toggleUpdateDelete = true;
                }
            });
        };

        this.filteredPostcodes = this.addressFormGroup.get('postcode').valueChanges.pipe(
            startWith(''),
            map(value => value.length < 2 ? [] : this.filter(value))
        );
        //no options shown on empty input/on focus 
        //kicks in only if 2+ characters typed
        //filtering always starts at first position, index 0 of the string.
        //limits to 10 different results, no duplicates
    }

    createForm() {
        this.addressFormGroup = new FormGroup({
            street: new FormControl('', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(5),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])),
            number: new FormControl('', Validators.compose([
                Validators.pattern('^[1-9][0-9]*$'),
                Validators.required
            ])),
            postcode: new FormControl('', Validators.compose([
                Validators.maxLength(5),
                Validators.minLength(5),
                Validators.pattern('^[0-9]+$'),
                Validators.required,
                this.postcodeValidator
            ])),
            city: new FormControl({ value: '', disabled: true }, Validators.required),
        });
        // or use fb service

        this.userDetailsForm = this.fb.group({
            firstname: ['', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(2),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])],
            lastname: ['', Validators.compose([
                Validators.maxLength(20),
                Validators.minLength(2),
                Validators.pattern('^(?=.*[a-zA-ZÀ-ž -])[a-zA-ZÀ-ž -]+$'),
                Validators.required
            ])],
            gender: ['Other', Validators.required],
            birthday: ['', Validators.required],
            address: this.addressFormGroup
        })
    }

    filter(value: string): string[] {
        return (postcodesData as any).default.filter(obj =>
            obj.zipcode.indexOf(value) == 0
        ).map(obj => obj.zipcode).reduce(
            (unique, zipcode) => (unique.includes(zipcode) ? unique : [...unique, zipcode]), [])
            .slice(0, 10)
    }

    postcodeValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
        // this.userDetailsForm.get('address').get('city').disable();
        if (control.value.length == 5) {

            this.cities = (postcodesData as any).default.filter(obj =>
                obj.zipcode == control.value
            ).map(obj => obj.place); //where cities are set

            if (this.cities.length == 0) {
                return { notFound: true }//customize validation
            } else {
                this.userDetailsForm.get('address').get('city').enable();
                return null;
            }
        }
    }
    // with AbstractControl, formcontrol of postcode is passed

    onSubmitUserDetails(formObject) {
        this.mappedFormObject = {
            firstname: formObject.firstname,
            lastname: formObject.lastname,
            gender: formObject.gender,
            birthday: formObject.birthday.format('DD.MM.YYYY'),
            address: formObject.address
        }; //Birthday has Moment interface. Shall be converted to string using format method

        if (this.toggleUpdateDelete) {
            this.mappedFormObject.id = this.route.snapshot.paramMap.get('id');
            this.store$.dispatch(
                new AddressBookStoreActions.UpdateInfoAction({ item: this.mappedFormObject })
            );
        } else {
            this.store$.dispatch(
                new AddressBookStoreActions.CreateUserAction({ item: this.mappedFormObject })
            );
        }
    }

    onCancel() {
        this.router.navigate(['']);
    }

    onDelete() {
        this.store$.dispatch(
            new AddressBookStoreActions.DeleteUserAction({ id: this.route.snapshot.paramMap.get('id') })
        );
    }
}
