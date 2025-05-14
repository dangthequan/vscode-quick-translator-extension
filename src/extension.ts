// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import TranslatorEngine from './modules/TranslatorEngine/TranslatorEngine';
import {readFile} from './io/IO';
import { registerUriHandler } from './handlers/DeeplinkHandler';
import { AES_SEED, DataField } from './constants/Constants';
import { translateWithChatGPTApi } from './vendors/ChatGPT';
import { getSettingsPopupContent, showWebPopup } from './popups/Popups';
import { aesEncrypt } from './crypto/Crypto';

const GOOGLE_TRANSLATE_SELECTION = "Dịch với Google";
const CHAT_GPT_SELECTION = "Dịch với ChatGPT";
const GITHUB_COPILOT_SELECTION = "Dịch với Github Copilot";
const GOOGLE_TRANSLATE_URI = 'https://translate.google.com.mx/?s=false&sl=auto&tl=vi&op=translate&text=';
const CHAT_GPT_URI = "https://chatgpt.com/?q=";
const TRANSLATE_TERM = "<CHAT_GPT_TERM>";
const PROMPT_MESSAGE = "Dịch \""+TRANSLATE_TERM+"\" sang tiếng Việt";

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

function displayTranslationFailureMessage(context: vscode.ExtensionContext, text: string) {
	vscode.window.showInformationMessage("Không có từ nào được dịch! Bạn có muốn dịch bằng ChatGPT, Github Copilot hay Google ?", CHAT_GPT_SELECTION, GITHUB_COPILOT_SELECTION, GOOGLE_TRANSLATE_SELECTION).then(selection => {
		if (selection === GOOGLE_TRANSLATE_SELECTION) {
			translateWithGoogle(text);
		}
		else if(selection === CHAT_GPT_SELECTION) {
			translateWithChatGPT(context, text);
		}
		else if (selection === GITHUB_COPILOT_SELECTION) {
			translateWithGithubCopilot(text);
		}
	});
}

function displayTranslationSuccessMessage(context: vscode.ExtensionContext, text: string, translatedText: string) {
	vscode.window.showInformationMessage("Bản dịch: "+translatedText, CHAT_GPT_SELECTION, GITHUB_COPILOT_SELECTION, GOOGLE_TRANSLATE_SELECTION).then(selection => {
		if (selection === GOOGLE_TRANSLATE_SELECTION) {
			translateWithGoogle(text);
		}
		else if(selection === CHAT_GPT_SELECTION) {
			translateWithChatGPT(context, text);
		}
		else if (selection === GITHUB_COPILOT_SELECTION) {
			translateWithGithubCopilot(text);
		}
	});
}

function translateWithGoogle(text: string) {
	vscode.env.openExternal(vscode.Uri.parse(GOOGLE_TRANSLATE_URI+encodeURI(text)));
}

function openAppDataFolder(context: vscode.ExtensionContext) {
	try {
		vscode.commands.executeCommand(`vscode.openFolder`, context.globalStorageUri);
	} catch (error) {
		console.error("openAppDataFolder >> error: ", error);
		vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình mở thư mục.');
	}
}

function saveSettings(context: vscode.ExtensionContext, message: {[key: string] : any}) {
	const data = message.data || {};
	const {chatGPTApiSecretKey, useChatGPTApi, chatGPTModel, chatGPTSystemPrompt} = data;
	const encryptedChatGPTApiSecretKey = aesEncrypt(chatGPTApiSecretKey, AES_SEED);

	context.globalState.update(DataField.ChatGPTApiSecretKey, encryptedChatGPTApiSecretKey);
	context.globalState.update(DataField.ChatGPTSystemPrompt, chatGPTSystemPrompt);
	context.globalState.update(DataField.UseChatGPTApi, useChatGPTApi);
	context.globalState.update(DataField.ChatGPTModel, chatGPTModel);
	vscode.window.showInformationMessage("Cấu hình mới đã được lưu! "+JSON.stringify(data));
}

function onProcessSettingsCommand(context: vscode.ExtensionContext, message: { [key : string] : any}) {
	if (message.command === "saveSettings") {
		saveSettings(context, message);
	} 
	else if (message.command === "openAppDataFolder") {
		openAppDataFolder(context);
	}
}

async function translateWithChatGPT(context: vscode.ExtensionContext, text: string) {
	const useChatGPTApi = context.globalState.get<boolean>(DataField.UseChatGPTApi, false);
	const apiKey = context.globalState.get<string>(DataField.ChatGPTApiSecretKey, "");
	if (useChatGPTApi && apiKey && apiKey.length > 0) {
		await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification, // Hiển thị ở góc dưới cùng
            title: "Đang dịch với ChatGPT...",
            cancellable: false, // Không cho phép hủy
        },
        async (progress) => {
            progress.report({ increment: 0, message: "Đang gửi yêu cầu..." });

            try {
                const translatedText = await translateWithChatGPTApi(context, text);
                progress.report({ increment: 50, message: "Đang xử lý kết quả..." });

                const editor = vscode.window.activeTextEditor;
                if (translatedText && editor) {
                    const selection = editor.selection;
                    editor.edit((editBuilder) => {
                        editBuilder.replace(selection, translatedText);
                    });
                }

                progress.report({ increment: 100, message: "Hoàn thành!" });
                vscode.window.showInformationMessage("Dịch thành công!");
            } catch (error) {
                console.error(error);
                vscode.window.showErrorMessage("Rất tiếc! Có lỗi xảy ra trong quá trình dịch.");
            }
        });
	}
	else {
		vscode.env.openExternal(vscode.Uri.parse(CHAT_GPT_URI+encodeURI(PROMPT_MESSAGE.replace(TRANSLATE_TERM, text))));
	}
	
}

function translateWithGithubCopilot(text: string) {
	vscode.commands.executeCommand('workbench.action.chat.open', PROMPT_MESSAGE.replace(TRANSLATE_TERM, text));
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
	registerUriHandler();

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
					displayTranslationFailureMessage(context, text);
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
					displayTranslationFailureMessage(context, text);
				}
				else {
					displayTranslationSuccessMessage(context, text, translatedResult["result"]);
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
				translateWithChatGPT(context, text);
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500)
		
	});

	const tranWithGithubCopilotDisposable = vscode.commands.registerCommand('quick-translator.translateWithGithubCopilot', async () => {
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
				translateWithGithubCopilot(text);
			} catch (error) {
				console.error(error);
				vscode.window.showErrorMessage('Rất tiếc! Có lỗi xảy ra trong quá trình dịch.');
			}
		}, 500)
		
	});

	let settingsWebContent = getSettingsPopupContent(context);
	showWebPopup(context, {
		id: 'settingsWebview',
		command: 'quick-translator.showSettings',
		title: "Cài đặt cấu hình",
		html: settingsWebContent,
		onMessage: (message: { [key : string] : any}) => {
			onProcessSettingsCommand(context, message);
		}
	})
	
	context.subscriptions.push(tranToVietnameseDisposable);
	context.subscriptions.push(showVietnameseMeaningDisposable);
	context.subscriptions.push(openAppPathDisposable);
	context.subscriptions.push(tranWithGoogleDisposable);
	context.subscriptions.push(tranWithChatGPTDisposable);
	context.subscriptions.push(tranWithGithubCopilotDisposable);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
