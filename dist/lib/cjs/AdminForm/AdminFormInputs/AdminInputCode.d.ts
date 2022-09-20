import React from 'react';
import { InputTextProps } from 'primereact/inputtext';
import { IAceEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-github';
import { AdminInputBaseProps } from '../AdminForm';
export declare type AdminInputTextProps = InputTextProps & AdminInputBaseProps & IAceEditorProps;
declare const AdminInputCode: React.FC<AdminInputTextProps>;
export default AdminInputCode;
