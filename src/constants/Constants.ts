export const Vendor = {
    ChatGPT : "ChatGPT"
}

export const TaskCode = {
    Authen: 1000
}

export const ChatGPTModel = {
    GPT41 : "gpt-4.1",
    GPT41Mini: "gpt-4.1-mini",
    GPT4 : "gpt-4",
    GPT40Mini: "gpt-4o-mini"
}

export const DataField = {
    ChatGPTApiSecretKey: "ChatGPT_Api_Secret_Key",
    UseChatGPTApi: "Use_ChatGPT_Api",
    ChatGPTModel: "ChatGPT_Model",
    ChatGPTSystemPrompt: "ChatGPT_System_Prompt"
}

export const AES_SEED = "I'm Vietnamese";
export const DEFAULT_CHATGPT_SYSTEM_PROMPT = "Bạn là chuyên gia trong lĩnh vực dịch thuật tiếng Trung sang tiếng Việt, tôi nhập vào tiếng Trung, bạn trả về tiếng Việt. Không dịch ký tự tiếng Trung này，(dấu phẩy) và nếu trong nội dung nhập vào có cả ký tự tiếng Trung và ký tự khác thì chỉ dịch thay thế các ký tự tiếng Trung bằng tiếng Việt (trim space trước khi replace), các ký tự còn lại không dịch."