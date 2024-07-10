import { faker } from '@faker-js/faker';

export function priceStringToFloat(priceString : string){
    // regex to filter out all NON digit or . chars
    let regex : RegExp = /[^0-9|.]*/

    return Number(priceString.replace(regex, ''));
}

export function delay(ms: number){
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export function getRandomItem<T>(array : Array<T>) : T {
    return array[Math.trunc(Math.random() * array.length)];
}