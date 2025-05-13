import * as vscode from 'vscode';

export async function readFile(uri: vscode.Uri): Promise<string> {
    const fileData = await vscode.workspace.fs.readFile(uri);
    return Buffer.from(fileData).toString('utf8');
}

export async function writeFile(uri: vscode.Uri, content: string): Promise<void> {
    const fileData = Buffer.from(content, 'utf8');
    await vscode.workspace.fs.writeFile(uri, fileData);
}