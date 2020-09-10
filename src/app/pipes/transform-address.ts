import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../interfaces/address-interfaces';

@Pipe({name: 'transformAddress'})

export class TransformAddressPipe implements PipeTransform {
    transform(value: Address): string {
        return `${value.street} ${value.number}, ${value.city}, ${value.postcode}`;
    }
}