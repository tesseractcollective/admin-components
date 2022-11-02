import React from 'react';
import { IAceEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import { AdminDetailBaseProps } from '../AdminDetail';
export declare type AdminDetailCodeProps = AdminDetailBaseProps & IAceEditorProps;
export declare const AdminDetailCode: React.FC<AdminDetailCodeProps>;
