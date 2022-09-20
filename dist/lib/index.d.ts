import { DataTableRowClickEventParams, DataTableSelectParams, DataTableSortOrderType, DataTableFilterMeta, DataTablePFSEvent, DataTableMultiSortMetaType, DataTableProps, DataTable } from 'primereact/datatable';
import { GraphQLClient } from 'graphql-request';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { WhereClause as WhereClause$1 } from 'Admin/AdminTable/adminTableUtils';
import { GraphQLResponse } from 'graphql-request/dist/types';
import { Client } from 'graphql-ws';
import React from 'react';
import { ColumnBodyOptions } from 'primereact/column';
import { CheckboxProps } from 'primereact/checkbox';
import { Control, RegisterOptions } from 'react-hook-form';
import { InputNumberProps } from 'primereact/inputnumber';
import { ChipsProps } from 'primereact/chips';
import { InputTextProps } from 'primereact/inputtext';
import { IAceEditorProps } from 'react-ace';
import { AutoCompleteProps } from 'primereact/autocomplete';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { DropdownProps } from 'primereact/dropdown';
import { EditorProps } from 'primereact/editor';
import { ToggleButtonProps } from 'primereact/togglebutton';

interface Attribute {
    name: string;
    value: string;
    type: AttributeType;
    [key: string]: any;
}
interface AttributeType {
    name: string;
    order: number;
    valueType: ValueType;
    description?: string;
    label?: string;
    props?: Record<string, any>;
    validation?: Record<string, any>;
    [key: string]: any;
}
interface AttributeGroup {
    name: string;
    label?: string;
    description?: string;
    meta?: Record<string, any>;
    order: number;
    types: AttributeType[];
}
declare enum ValueType {
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
interface Address {
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
interface AddressCountry {
    code: string;
    iso3: string;
    name: string;
    flagEmoji: string;
    flagEmojiUnicode: string;
    stateLabel: string;
}
interface AddressState {
    code: string;
    name: string;
    countryCode: string;
    latitude?: number;
    longitude?: number;
}

declare function valueForAttribute(attributes: Attribute[] | undefined, name: string): string;
declare const rowToNewTab: (event: DataTableRowClickEventParams | DataTableSelectParams, route: string, onRowClick: (row: any, path?: string) => void) => void;
declare function addressSingleLineFormat(address: Address): string;
declare function isEqual(obj1: any, obj2: any): boolean;
declare function formatDateString(date: string): string;
declare const moneyFormat: Intl.NumberFormat;

interface DataAdapters {
    dataAdapter: HasuraDataAdapter;
    tableAdapter: AdminTableHasuraAdapter;
}
declare function useDataAdapter(typename: string, fieldsFragment: DocumentNode, baseWhere?: WhereClause$1, client?: GraphQLClient): DataAdapters;

declare type ThemeName = 'light' | 'dark';

interface DataAdapter {
    infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>;
}
interface InfiniteQueryOptions {
    limit?: number;
    offset?: number;
    where?: Record<string, any>;
    orderBy?: Record<string, any>;
    distinctOn?: string[];
}
interface InfiniteQueryResponse<T> {
    current: T[];
    aggregate: {
        aggregate: {
            count: number;
        };
    };
}
declare type HasuraGraphQLNamingConvention = 'hasuraDefault' | 'graphqlDefault';
declare type SubscriptionCallback = (error: any, data?: Record<string, any>) => void;
declare class HasuraDataAdapter implements DataAdapter {
    client: GraphQLClient;
    typename: string;
    fieldsFragment: DocumentNode;
    namingConvention: HasuraGraphQLNamingConvention;
    schema?: GraphQLSchema;
    webSocketClient?: Client;
    previousSubscriptionValue?: string;
    constructor(client: GraphQLClient, typename: string, fieldsFragment: DocumentNode, namingConvention: HasuraGraphQLNamingConvention, schema?: GraphQLSchema, webSocketClient?: Client);
    infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>;
    infiniteManySubscription(callback: SubscriptionCallback, options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): void;
    unsubscribe(): void;
    private buildInfiniteManyQuery;
}

declare type WhereClause = Record<string, any>;

interface AdminTableState {
    current: any[];
    total: number;
    first: number;
    rows: number;
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    filters?: DataTableFilterMeta;
    error?: string;
}
declare type AdminTableAdapterEvent = 'reload';
interface ExportOptions {
    fields?: string[];
    sortField?: string;
    sortOrder?: DataTableSortOrderType;
    filters?: DataTableFilterMeta;
}
declare abstract class AdminTableAdapter {
    events: Record<AdminTableAdapterEvent, EventListener[]>;
    abstract readonly initialState: AdminTableState;
    abstract handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    abstract subscribe(fields: string[], callback: (state: AdminTableState) => void): void;
    abstract unsubscribe(): void;
    abstract fetchAllAsRecords(options: ExportOptions): Promise<Record<string, any>[]>;
    on(event: AdminTableAdapterEvent, listener: EventListener): void;
    emit(event: AdminTableAdapterEvent): void;
    reload(): void;
}
declare class AdminTableHasuraAdapter extends AdminTableAdapter {
    dataAdapter: HasuraDataAdapter;
    lastEvent?: DataTablePFSEvent;
    baseWhere?: WhereClause;
    baseDistinctOn?: string[];
    baseOrderBy?: DataTableMultiSortMetaType;
    readonly initialState: AdminTableState;
    constructor(dataAdapter: HasuraDataAdapter, baseWhere?: WhereClause, baseDistinctOn?: string[], baseOrderBy?: DataTableMultiSortMetaType);
    handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>;
    subscribe(fields: string[], callback: (state: AdminTableState) => void): void;
    unsubscribe(): void;
    private createNewState;
    fetchAllAsRecords(_options: ExportOptions): Promise<Record<string, any>[]>;
}

declare const AdminTable: React.ForwardRefExoticComponent<{
    adapter: AdminTableAdapter;
    shouldSubscribe?: boolean | undefined;
} & DataTableProps & React.RefAttributes<DataTable>>;

declare const dateBody: (data: any, options: ColumnBodyOptions) => string;
declare const dateTimeBody: (data: any, options: ColumnBodyOptions) => string;
declare const moneyBody: (data: any, options: ColumnBodyOptions) => string;

interface AdminInputBaseProps {
    name: string;
    control?: Control<any>;
    label?: string;
    helpText?: string;
    containerClassName?: string;
    attributeType?: AttributeType;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    onBlur?: () => void;
    onChange?: (e: any) => void;
    [key: string]: any;
}
interface AdminFormProps {
    className?: string;
    children: React.ReactNode;
    defaultValues?: Record<string, any>;
    attributeTypes?: AttributeType[] | Record<string, AttributeType>;
    onSubmit: (record: Record<string, any>) => void;
    onInvalid?: (errors: any) => void;
    shouldSubmit?: boolean;
}
declare const AdminForm: React.FC<AdminFormProps>;
declare function validateProps(props: AdminInputBaseProps & Record<string, any>): void;
declare function buildClassName(classNameFromProps: string | undefined, errorMessage?: string): string | undefined;

declare type AdminInputBooleanProps = CheckboxProps & AdminInputBaseProps;
declare const AdminInputBoolean: React.FC<AdminInputBooleanProps>;

declare type AdminInputCeslisusProps = AdminInputBaseProps & Omit<InputNumberProps, 'disabled'> & {
    mode?: 'celsius' | 'fahrenheit';
    inputMode?: 'decimal' | 'currency';
    disabled?: boolean;
};
declare const AdminInputCelsius: React.FC<AdminInputCeslisusProps>;

declare type IChipsProps = Omit<ChipsProps, 'value' | 'onChange'>;
declare type AdminChipsInputProps = IChipsProps & AdminInputBaseProps & {
    required?: boolean;
};
declare const AdminInputChips: React.FC<AdminChipsInputProps>;

declare type AdminInputTextProps$4 = InputTextProps & AdminInputBaseProps & IAceEditorProps;
declare const AdminInputCode: React.FC<AdminInputTextProps$4>;

declare type AdminInputCountryProps = AutoCompleteProps & AdminInputBaseProps & {
    defaultCountryCode?: string;
    onCountrySelect?: (country?: AddressCountry) => void;
    autofill?: boolean;
};
declare const AdminInputCountry: React.FC<AdminInputCountryProps>;

declare type AdminInputDateProps = AdminInputBaseProps & Omit<KeyboardDatePickerProps, 'onChange' | 'value'> & {
    onChange?: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
    value?: ParsableDate | null | undefined;
};
declare const AdminInputDate: React.FC<AdminInputDateProps>;

declare type AdminInputTextProps$3 = InputTextProps & AdminInputBaseProps;
declare const AdminInputText: React.FC<AdminInputTextProps$3>;

declare const AdminInputEmail: React.FC<AdminInputTextProps$3>;

declare type AdminInputTextProps$2 = InputTextProps & AdminInputBaseProps & IAceEditorProps;
declare const AdminInputJson: React.FC<AdminInputTextProps$2>;

declare const AdminInputLink: React.FC<AdminInputTextProps$3>;

declare type AdminInputNumberProps = InputNumberProps & AdminInputBaseProps & {
    mode?: 'decimal' | 'currency';
};
declare const AdminInputNumber: React.FC<AdminInputNumberProps>;

declare type AdminInputPhoneProps = AdminInputBaseProps & {
    number?: string;
    required?: boolean;
};
declare const AdminInputPhone: React.FC<AdminInputPhoneProps>;

interface InputRelationProps {
    relationshipColumnNameForLabel: string;
    relationshipColumnNameForValue: string;
    adapter: DataAdapter;
    where?: Record<string, any>;
}
declare type AdminInputRelationProps = DropdownProps & AdminInputBaseProps & InputRelationProps;
declare const AdminInputRelation: React.FC<AdminInputRelationProps>;

declare type AdminInputTextProps$1 = EditorProps & AdminInputBaseProps & {
    required?: boolean;
};
declare const AdminInputRichText: React.FC<AdminInputTextProps$1>;

declare type AdminInputSelectProps = DropdownProps & AdminInputBaseProps;
declare const AdminInputSelect: React.FC<AdminInputSelectProps>;

declare type AdminInputStateProps = AutoCompleteProps & AdminInputBaseProps & {
    countryCode?: string;
};
declare const AdminInputState: React.FC<AdminInputStateProps>;

declare type AdminInputToggleProps = ToggleButtonProps & AdminInputBaseProps;
declare const AdminInputToggle: React.FC<AdminInputToggleProps>;

declare type AdminInputTextProps = InputTextProps & AdminInputBaseProps & IAceEditorProps;
declare const AdminInputYaml: React.FC<AdminInputTextProps>;

declare enum NationalIdTypeEnum {
    UsSsn = "UsSsn",
    UsEin = "UsEin",
    Other = "Other"
}
declare type AdminInputNationalIdProps = AdminInputBaseProps & {
    idType: NationalIdTypeEnum;
    idLength?: number;
};
declare const AdminInputNationalId: React.FC<AdminInputNationalIdProps>;

interface AdminFormAttributesProps {
    attributes: Attribute[];
    groups: AttributeGroup[];
    shouldSave?: boolean;
    onCompletion: (newAttributes: Attribute[]) => void;
}
declare const AdminFormAttributes: React.FC<AdminFormAttributesProps>;

declare const inputForValueType: (type: ValueType) => React.FC<AdminInputBaseProps>;
interface AdminInputFieldProps {
    control: Control<Record<string, string>, any>;
    passthroughProps?: Record<string, {
        [key: string]: any;
        rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    }>;
}
declare const adminInputForAttributeType: (type: AttributeType, props: AdminInputFieldProps) => React.FC<AdminInputBaseProps>;
declare const adminInputsForAttributeTypes: (attributeTypes: AttributeType[], props: AdminInputFieldProps) => React.FC<AdminInputBaseProps>[];

interface AdminDetailBaseProps {
    value?: string;
    type?: AttributeType;
    attribute?: Attribute;
    labelClassName?: string;
    hideLabel?: boolean;
}
declare type AdminDetailLabelWrapperProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
declare type AdminDetailTextProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
declare const AdminDetailLabelWrapper: React.FC<AdminDetailLabelWrapperProps>;
declare const getValue: (props: AdminDetailBaseProps) => any;
declare const detailComponentForValueType: (type: ValueType | undefined) => React.FC<AdminDetailTextProps>;
declare const adminDetailForAttribute: (attribute: Attribute | undefined, props?: AdminDetailLabelWrapperProps) => React.FC<AdminDetailBaseProps>;
declare const adminDetailsForAttributes: (attributes: Attribute[], props: AdminDetailBaseProps) => React.FC<AdminDetailBaseProps>[];
declare const findTypeInTypes: (types: AttributeType[], name: string) => AttributeType | undefined;
declare const findTypeInGroups: (groups: AttributeGroup[], name: string) => AttributeType | undefined;

declare type AdminDetailCodeProps = AdminDetailBaseProps & IAceEditorProps;
declare const AdminDetailCode: React.FC<AdminDetailCodeProps>;

declare type AdminDetailDateProps = AdminDetailTextProps & {
    showTime?: boolean;
};
declare const AdminDetailDate: React.FC<AdminDetailDateProps>;

declare const AdminDetailJson: React.FC<AdminDetailCodeProps>;

declare type AdminDetailLinkProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
declare const AdminDetailLink: React.FC<AdminDetailLinkProps>;

declare const AdminDetailRichText: React.FC<AdminDetailTextProps>;

declare const AdminDetailText: React.FC<AdminDetailTextProps>;

declare const AdminDetailYaml: React.FC<AdminDetailCodeProps>;

interface AdminDetailAttributesProps {
    attributes: Attribute[];
    groups: AttributeGroup[];
    onEditButtonClick?: () => void;
}
declare const AdminDetailAttributes: React.FC<AdminDetailAttributesProps>;

export { Address, AddressCountry, AddressState, AdminDetailAttributes, AdminDetailAttributesProps, AdminDetailBaseProps, AdminDetailCode, AdminDetailDate, AdminDetailJson, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, AdminDetailLink, AdminDetailRichText, AdminDetailText, AdminDetailTextProps, AdminDetailYaml, AdminForm, AdminFormAttributes, AdminFormAttributesProps, AdminFormProps, AdminInputBaseProps, AdminInputBoolean, AdminInputCelsius, AdminInputChips, AdminInputCode, AdminInputCountry, AdminInputDate, AdminInputEmail, AdminInputFieldProps, AdminInputJson, AdminInputLink, AdminInputNationalId, AdminInputNumber, AdminInputPhone, AdminInputRelation, AdminInputRichText, AdminInputSelect, AdminInputState, AdminInputText, AdminInputToggle, AdminInputYaml, AdminTable, AdminTableAdapter, AdminTableAdapterEvent, AdminTableHasuraAdapter, AdminTableState, Attribute, AttributeGroup, AttributeType, DataAdapter, DataAdapters, ExportOptions, HasuraDataAdapter, HasuraGraphQLNamingConvention, InfiniteQueryOptions, InfiniteQueryResponse, SubscriptionCallback, ThemeName, ValueType, addressSingleLineFormat, adminDetailForAttribute, adminDetailsForAttributes, adminInputForAttributeType, adminInputsForAttributeTypes, buildClassName, dateBody, dateTimeBody, detailComponentForValueType, findTypeInGroups, findTypeInTypes, formatDateString, getValue, inputForValueType, isEqual, moneyBody, moneyFormat, rowToNewTab, useDataAdapter, validateProps, valueForAttribute };
