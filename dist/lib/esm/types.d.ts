export interface Attribute {
    name: string;
    value: string;
    type: AttributeType;
    [key: string]: any;
}
export interface AttributeType {
    name: string;
    order: number;
    valueType: ValueType;
    description?: string;
    label?: string;
    props?: Record<string, any>;
    validation?: Record<string, any>;
    [key: string]: any;
}
export interface AttributeGroup {
    name: string;
    label?: string;
    description?: string;
    meta?: Record<string, any>;
    order: number;
    types: AttributeType[];
}
export declare enum ValueType {
    Address = "Address",
    AddressSingleLine = "AddressSingleLine",
    Boolean = "Boolean",
    Celsius = "Celsius",
    Chips = "Chips",
    Country = "Country",
    Date = "Date",
    Email = "Email",
    File = "File",
    Image = "Image",
    Json = "JSON",
    Kilograms = "Kilograms",
    Link = "Link",
    Meters = "Meters",
    Number = "Number",
    Phone = "Phone",
    Relation = "Relation",
    RichText = "RichText",
    Select = "Select",
    Text = "Text",
    Toggle = "Toggle",
    Yaml = "YAML"
}
export interface Address {
    street1: string;
    street2?: string;
    city: string;
    stateCode?: string;
    postalCode: string;
    countryCode: string;
    latitude?: number;
    longitude?: number;
    altitude?: number;
}
export interface AddressCountry {
    code: string;
    iso3: string;
    name: string;
    flagEmoji: string;
    flagEmojiUnicode: string;
    stateLabel: string;
}
export interface AddressState {
    code: string;
    name: string;
    countryCode: string;
    latitude?: number;
    longitude?: number;
}
