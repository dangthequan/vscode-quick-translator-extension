import * as vscode from 'vscode';
import { TaskCode } from '../constants/Constants';
const qs = require("qs");

function handleAuthentication(params: { [key: string]: any }) {
    
}

function handleDeeplink(params: { [key: string]: any }) {
    const taskCode = params.hasOwnProperty("tc") ? parseInt(params["tc"]) : 0;
    switch(taskCode) {
        case TaskCode.Authen:
            handleAuthentication(params);
            break;
        default:
            break;
    }
}

export function registerUriHandler() {
    vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri) {
            const params = qs.parse(uri.query || {});
            handleDeeplink(params)
        }
    });
}