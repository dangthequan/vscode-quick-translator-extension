
import * as vscode from 'vscode';
import { AES_SEED, ChatGPTModel, DataField, DEFAULT_CHATGPT_SYSTEM_PROMPT } from '../constants/Constants';
import { aesDecrypt } from '../crypto/Crypto';

export function getSettingsPopupContent(context: vscode.ExtensionContext): string {
    let chatGPTApiSecretKey = context.globalState.get<string>(DataField.ChatGPTApiSecretKey, "");
    if (chatGPTApiSecretKey && chatGPTApiSecretKey.length > 0) {
        chatGPTApiSecretKey = aesDecrypt(chatGPTApiSecretKey, AES_SEED);
    }
    const chatGPTModel = context.globalState.get<string>(DataField.ChatGPTModel, ChatGPTModel.GPT41Mini);
    const useChatGPTApi = context.globalState.get<boolean>(DataField.UseChatGPTApi, false);
    const chatGPTSystemPrompt = context.globalState.get<string>(DataField.ChatGPTSystemPrompt, DEFAULT_CHATGPT_SYSTEM_PROMPT);
    const appDataPath = context.globalStorageUri.fsPath;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            <title>QuickTranslator - Cài đặt cấu hình</title>
        </head>
        <body>
            <div class="bg-gray-200 p-3">
                <h1 class="text-2xl text-gray-700 font-bold">QuickTranslator - Cài đặt cấu hình</h1>
                <div class="mt-6 flex flex-col overflow-y-scroll" >
                    <form id="popupForm">
                        <div class="flex flex-col">
                            <div class="mt-3 flex-col">
                                <h2 class="text-lg text-gray-700 font-bold">Cấu hình chung</h2>
                                <div class="mt-3 flex-col border border-gray-200 bg-white rounded-lg p-3">
                                    <div class="flex flex-row items-center justify-between">
                                        <div class="flex w-full flex-row items-center px-2 py-1">
                                            <div class="text-gray-700">Thư mục tệp cấu hình:</div>
                                            <div class="ml-3 flex w-full bg-gray-200 px-3 py-1">
                                                <div class="flex w-full text-gray-700">${appDataPath}</div>
                                            </div>
                                        </div>
                                        <button class="bg-blue-500 text-white font-bold px-3 py-1" type="button" onclick="browserAppDataPath()">Mở thư mục</button>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 flex-col">
                                <h2 class="text-lg text-gray-700 font-bold">Dịch với AI</h2>
                                <div class="mt-3 flex-col border border-gray-200 bg-white rounded-lg p-3">
                                    <div class="flex flex-row items-center">
                                        <input type="checkbox" id="useChatGPTApiChkBox" name="useChatGPTApiChkBox" click="onUseChatGPTApi" ${useChatGPTApi ? "checked" : ""}/>
                                        <div class="ml-3 flex text-gray-700">Sử dụng ChatGPT API</div>
                                    </div>
                                    <div id="chatGPTApiSecretKeyInputHolder" class="flex flex-col${useChatGPTApi ? '' : ' invisible'}">
                                        <div class="mt-3 flex flex-row items-center">
                                            <div class="text-gray-700">ChatGPT API Key:</div>
                                            <div class="ml-3 flex w-full bg-gray-200 px-3 py-1">
                                                <input class="flex w-full text-gray-700" type="password" id="chatGPTApiSecretKeyInput" name="chatGPTApiSecretKeyInput" value="${chatGPTApiSecretKey}" />
                                            </div>
                                        </div>
                                        <div class="mt-3 flex flex-row items-center">
                                            <div class="text-gray-700">ChatGPT Model:</div>
                                            <div class="ml-3 flex bg-gray-200 px-3 py-1">
                                                <input class="flex text-gray-700" type="text" id="chatGPTModelInput" name="chatGPTModelInput" value="${chatGPTModel}" />
                                            </div>
                                        </div>
                                        <div class="mt-3 flex flex-row items-center">
                                            <div class="text-gray-700">ChatGPT System Prompt:</div>
                                            <div class="ml-3 flex w-full bg-gray-200 px-3 py-1">
                                                <input class="flex w-full text-gray-700" type="text" id="chatGPTSystemPromptInput" name="chatGPTSystemPromptInput" value="${chatGPTSystemPrompt}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="mt-3 bg-blue-500 text-white font-bold px-6 py-3" type="button" onclick="saveSettings()">Lưu cấu hình</button>
                    </form>
                </div>
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                function saveSettings() {
                    const chatGPTApiSecretKey = document.getElementById('chatGPTApiSecretKeyInput').value;
                    const chatGPTModel = document.getElementById('chatGPTModelInput').value;
                    const chatGPTSystemPrompt = document.getElementById('chatGPTSystemPromptInput').value;
                    const useChatGPTApi = document.getElementById('useChatGPTApiChkBox').checked;
                    vscode.postMessage({
                        command: 'saveSettings',
                        data: {
                            chatGPTApiSecretKey: chatGPTApiSecretKey,
                            chatGPTSystemPrompt: chatGPTSystemPrompt,
                            useChatGPTApi: useChatGPTApi,
                            chatGPTModel: chatGPTModel
                        }
                        
                    });
                }

                function onUseChatGPTApi(e) {
                    const useChatGPTApiCheckbox = document.getElementById('useChatGPTApiChkBox');
                    useChatGPTApiCheckbox.checked = !useChatGPTApiCheckbox.checked;
                }

                function browserAppDataPath() {
                    vscode.postMessage({
                        command: 'openAppDataFolder'
                    });
                }
                
                document.addEventListener('DOMContentLoaded', function(){ 
                    const useChatGPTApiCheckbox = document.getElementById('useChatGPTApiChkBox');
                    useChatGPTApiCheckbox.addEventListener('change', (event) => {
                        const checked = event.target.checked;
                        const chatGPTApiSecretKeyInputHolder = document.getElementById('chatGPTApiSecretKeyInputHolder');
                        if (checked) {
                            chatGPTApiSecretKeyInputHolder.classList.remove("invisible");
                        }
                        else {
                            chatGPTApiSecretKeyInputHolder.classList.add("invisible");
                        }
                    });    
                }, false);
                

                
            </script>
        </body>
        </html>
    `;
}

function getEmbeddedWebviewContent(title: string, url: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <iframe src="${url}" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
        </body>
        </html>
    `;
}

export function showWebPopup(context: vscode.ExtensionContext, options: {[key : string] : any}) {
    const subcription = vscode.commands.registerCommand(options.command, async () => {
        // Tạo và hiển thị Webview Panel
        const panel = vscode.window.createWebviewPanel(
            options.id, // Định danh Webview
            options.title, // Tiêu đề hiển thị
            vscode.ViewColumn.One, // Hiển thị ở cột đầu tiên
            {
                enableScripts: true, // Cho phép chạy JavaScript trong Webview
            }
        );

        // Nội dung HTML của Webview
        panel.webview.html = options.html;

        // Lắng nghe sự kiện từ Webview
        panel.webview.onDidReceiveMessage(
            message => {
                const {onMessage} = options;
                if (onMessage && typeof onMessage === 'function') {
                    onMessage(message);
                }
            },
            undefined,
            context.subscriptions
        );
    });
    context.subscriptions.push(subcription);
}