// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import TranslatorEngine from './modules/TranslatorEngine/TranslatorEngine';
import {readFile} from './io/IO';

const GOOGLE_TRANSLATE_SELECTION = "Dịch với Google";
const CHAT_GPT_SELECTION = "Dịch với ChatGPT";
const GOOGLE_TRANSLATE_URI = 'https://translate.google.com.mx/?s=false&sl=auto&tl=vi&op=translate&text=';
const CHAT_GPT_URI = "https://chatgpt.com/?q=";
const CHAT_GPT_TERM = "<CHAT_GPT_TERM>";
const CHAT_GPT_MESSAGE = "Bạn là chuyên gia dịch thuật tiếng Trung sang tiếng Việt, hãy dịch từ sau sang tiếng Việt: \""+CHAT_GPT_TERM+"\"";

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
			continue;
		}
        fs.copyFileSync(sourceFile, destFile);
    }
}

async function initializeEngine(appDataPath: string) {
	TranslatorEngine.getInstance().init(appDataPath);
	const contentStr = await readFile(vscode.Uri.file(path.join(appDataPath, 'ChinesePhienAmWords.txt')));
	const hanVietDictionary = TranslatorEngine.getInstance().parseIniToMap(contentStr); 
	TranslatorEngine.getInstance().setHanVietDictionary(hanVietDictionary);	
}

function displayTranslationFailureMessage(text: string) {
	vscode.window.showInformationMessage("Không có từ nào được dịch! Bạn có muốn dịch bằng ChatGPT hoặc Google ?", CHAT_GPT_SELECTION, GOOGLE_TRANSLATE_SELECTION).then(selection => {
		if (selection === GOOGLE_TRANSLATE_SELECTION) {
			translateWithGoogle(text);
		}
		else if(selection === CHAT_GPT_SELECTION) {
			translateWithChatGPT(text);
		}
	});
}

function displayTranslationSuccessMessage(text: string, translatedText: string) {
	vscode.window.showInformationMessage("Bản dịch: "+translatedText, CHAT_GPT_SELECTION, GOOGLE_TRANSLATE_SELECTION).then(selection => {
		if (selection === GOOGLE_TRANSLATE_SELECTION) {
			translateWithGoogle(text);
		}
		else if(selection === CHAT_GPT_SELECTION) {
			translateWithChatGPT(text);
		}
	});
}

// Hàm tạo nội dung HTML cho Webview
function getWebviewContent(url: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Webview</title>
        </head>
        <body>
            <iframe src="${url}" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
        </body>
        </html>
    `;
}

function openEmbeddedWebview(webviewId:string, title: string, url: string) {
	// Create and show a new webview
	const panel = vscode.window.createWebviewPanel(
		webviewId, // Identifies the type of the webview. Used internally
		title, // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		 {
			enableScripts: true, // Cho phép chạy JavaScript trong Webview
		}
	);
	panel.webview.html = getWebviewContent(url);
}

function translateWithGoogle(text: string) {
	vscode.env.openExternal(vscode.Uri.parse(GOOGLE_TRANSLATE_URI+encodeURI(text)));
}

function translateWithChatGPT(text: string) {
	vscode.env.openExternal(vscode.Uri.parse(CHAT_GPT_URI+encodeURI(CHAT_GPT_MESSAGE.replace(CHAT_GPT_TERM, text))));
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
					displayTranslationFailureMessage(text);
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
					displayTranslationFailureMessage(text);
				}
				else {
					displayTranslationSuccessMessage(text, translatedResult["result"]);
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

	const tranWithGoogleDisposable = vscode.commands.registerCommand('quick-translator.translateWithGoogle', async () => {
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
				translateWithGoogle(text);
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500)
		
	});

	const tranWithChatGPTDisposable = vscode.commands.registerCommand('quick-translator.translateWithChatGPT', async () => {
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
				translateWithChatGPT(text);
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500)
		
	});
	
	context.subscriptions.push(tranToVietnameseDisposable);
	context.subscriptions.push(showVietnameseMeaningDisposable);
	context.subscriptions.push(openAppPathDisposable);
	context.subscriptions.push(tranWithGoogleDisposable);
	context.subscriptions.push(tranWithChatGPTDisposable);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
