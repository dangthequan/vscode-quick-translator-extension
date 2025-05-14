import * as vscode from 'vscode';
import { AES_SEED, ChatGPTModel, DataField, DEFAULT_CHATGPT_SYSTEM_PROMPT } from '../constants/Constants';
import { aesDecrypt } from '../crypto/Crypto';

export async function translateWithChatGPTApi(context: vscode.ExtensionContext, text: string, options: {[key: string] : any} = {}): Promise<string | null> {
    const encryptedApiSecretKey = context.globalState.get<string>(DataField.ChatGPTApiSecretKey, "");
    if (!(encryptedApiSecretKey && encryptedApiSecretKey.length > 0)) {
        vscode.window.showErrorMessage('ChatGPT Api Secret Key chưa được cấu hình. Vui lòng cấu hình để có thể dịch với ChatGPT!');
        return null;
    }

    try {
        const model = context.globalState.get<string>(DataField.ChatGPTModel, "");
        const systemPrompt = context.globalState.get<string>(DataField.ChatGPTSystemPrompt, "");
        const apiSecretKey = aesDecrypt(encryptedApiSecretKey, AES_SEED);
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiSecretKey}`
            },
            body: JSON.stringify({
                model: model && model.length > 0 ? model : ChatGPTModel.GPT41Mini,
                messages: [
                    { role: 'system', content: systemPrompt && systemPrompt.length > 0 ? systemPrompt : DEFAULT_CHATGPT_SYSTEM_PROMPT },
                    { role: 'user', content: text }
                ],
                ...options
            })
        });

        if (!response.ok) {
            vscode.window.showErrorMessage(`Có lỗi xảy ra khi gọi API ChatGPT: ${response.statusText}`);
            return null;
        }

        const data = await response.json() as {[key : string] : any};
        return data.choices[0].message.content;
    } catch (error) {
        console.error("ChatGPT >> translateWithChatGPTApi >> error: ", error);
        vscode.window.showErrorMessage('Có lỗi xảy ra khi gọi API ChatGPT: ');
        return null;
    }
}