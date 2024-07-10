//Recursive type definition for a JSON object or Array of JSON objects
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | {[key: string]: JSONValue}

export interface JSONObject {
    [k: string]: JSONValue
}
interface JSONArray extends Array<JSONValue> {}

export interface DataSchema {
}

export interface User extends DataSchema{
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    password: string
}

export interface ProductImage extends DataSchema{
    by_name: string,
    by_url: string,
    source_name: string,
    source_url: string,
    file_name: string,
    title: string,
    id: string
}

export interface Brand extends DataSchema{
    id: string,
    name: string,
    slug: string
}

export interface Category extends DataSchema{
    id: string,
    parent_id: string,
    name: string,
    slug: string
}

export interface Product extends DataSchema{
    id: string,
    name: string,
    description: string,
    price: number,
    is_location_offer: boolean,
    is_rental: boolean,
    brand: Brand,
    category: Category,
    product_image: ProductImage
}
