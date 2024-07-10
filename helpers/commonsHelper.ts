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

export function extractTestCaseTagID(tags : string[]): string {
    const regex : RegExp = /^@[A-Z]{3}-[0-9]{3}$/;
    const matching = tags.filter(item => item.match(regex));
    return matching[0];
}