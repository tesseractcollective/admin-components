import { GraphQLClient } from 'graphql-request';
import React from 'react';
import { ThemeName } from './../useTheme';
interface Props {
    children: React.ReactNode;
    client: GraphQLClient;
}
interface IAdminComponentContext {
    client: GraphQLClient;
    themeName: 'light' | 'dark';
    updateThemeName: (newThemeName: ThemeName) => void;
}
export declare const AdminComponentContext: React.Context<IAdminComponentContext>;
export declare const AdminComponentWrapper: React.FC<Props>;
export {};
