export interface UserAddress {
    id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    birthday: string;
    address: Address;
}

export interface Address {
    street: string;
    number: number;
    postcode: string;
    city: string;
}

///////////////Defining default values/////////////////////
// class DefaultAddressMaker implements Address {
//     street: string = "";
//     number: number = null;
//     postcode: string = "";
//     city: string = "";
// }

// export class DefaultUserAddressMaker implements UserAddress {
//     firstname: string = "";
//     lastname: string = "";
//     gender: string = "Other";
//     birthday: string = "";
//     address: Address = new DefaultAddressMaker();
// }

// import and declare in desired component >>> mappedFormObject: UserAddress = new DefaultUserAddressMaker;