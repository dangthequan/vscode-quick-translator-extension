// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import TranslatorEngine from './modules/TranslatorEngine/TranslatorEngine';
import {readFile} from './io/IO';

const GOOGLE_TRANSLATE_SELECTION = "Google Translate";
const GOOGLE_TRANSLATE_URI = 'https://translate.google.com.mx/?s=false&sl=auto&tl=vi&op=translate&text=';

function copyConfigFiles(destinationPath: string) {
    const sourcePath = path.join(__dirname, 'configs');
    if (!fs.existsSync(sourcePath)) {
        console.error('Source path does not exist:', sourcePath);
        return;
    }

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath);
    for (const file of files) {
        const sourceFile = path.join(sourcePath, file);
        const destFile = path.join(destinationPath, file);
		if (fs.existsSync(destFile)) {
			// console.log(`File ${file} already exists at destination. Skipping copy.`);
			continue;
		}
        fs.copyFileSync(sourceFile, destFile);
        // console.log(`Copied ${file} to ${destFile}`);
    }
}

async function initializeEngine(appDataPath: string) {
	TranslatorEngine.getInstance().init(appDataPath);
	var contentStr = await readFile(vscode.Uri.file(path.join(appDataPath, 'ChinesePhienAmWords.txt')));
	var hanVietDictionary = TranslatorEngine.getInstance().parseIniToMap(contentStr); 
	console.log("initializeEngine >> hanVietDictionary: ", JSON.stringify(hanVietDictionary));
	TranslatorEngine.getInstance().setHanVietDictionary(hanVietDictionary);	
}

function translateWithGoogle(text: string) {
	vscode.window.showInformationMessage("Không có từ nào được dịch! Bạn có muốn dịch bằng Google ?", "Google Translate").then(selection => {
		if (selection === GOOGLE_TRANSLATE_SELECTION) {
			vscode.env.openExternal(vscode.Uri.parse(
				GOOGLE_TRANSLATE_URI+encodeURI(text)));
		}
	});
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const appDataPath = context.globalStorageUri.fsPath;
	
	if (appDataPath.length <=0) {
		vscode.window.showErrorMessage("Hệ điều hành không được hỗ trợ");
		return;
	}
	else {
		copyConfigFiles(appDataPath);
	}

	initializeEngine(appDataPath);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "quick-translator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const tranToVietnameseDisposable = vscode.commands.registerCommand('quick-translator.translate', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Hãy mở một tệp tin và chọn một đoạn văn bản để dịch!');
			return;
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);
		if (!text) {
			vscode.window.showErrorMessage('Hãy chọn một đoạn văn bản để bắt đầu dịch!');
			return;
		}

		setTimeout(() => {
			try {
				const translatedResult = TranslatorEngine.getInstance().chineseToHanViet(text);
				editor.edit(editBuilder => {
					editBuilder.replace(selection, translatedResult["result"]);
				});
				if (text == translatedResult["result"]) {
					translateWithGoogle(text);
				}
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500)
		
	});

	const showVietnameseMeaningDisposable = vscode.commands.registerCommand('quick-translator.showMeaning', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Hãy mở một tệp tin và chọn một đoạn văn bản để dịch!');
			return;
		}

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		if (!text) {
			vscode.window.showErrorMessage('Hãy chọn một đoạn văn bản để bắt đầu dịch!');
			return;
		}

		if (text.length > 2000) {
			vscode.window.showErrorMessage('Chế độ Xem nghĩa chỉ hỗ trợ tối đa 2000 ký tự!');
			return;
		}

		setTimeout(() => {
			try {
				const translatedResult = TranslatorEngine.getInstance().chineseToHanViet(text);
				if (text == translatedResult["result"]) {
					translateWithGoogle(text);
				}
				else {
					vscode.window.showInformationMessage("Bản dịch: "+translatedResult["result"]);
				}
				
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500);
	});

	const openAppPathDisposable = vscode.commands.registerCommand('quick-translator.openAppPath', async () => {
		setTimeout(() => {
			try {
				vscode.commands.executeCommand(`vscode.openFolder`, context.globalStorageUri);
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình mở thư mục.');
			}
		}, 500);
	});
	
	context.subscriptions.push(tranToVietnameseDisposable);
	context.subscriptions.push(showVietnameseMeaningDisposable);
	context.subscriptions.push(openAppPathDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
