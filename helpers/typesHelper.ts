//Type definition for a JSON object or Array of JSON objects
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

export interface User {
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    password: string
}
