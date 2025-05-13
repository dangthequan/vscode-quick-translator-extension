import { Nullable, isNullOrEmpty } from "./types/Types";
import StringUtil from "./utils/StringUtil";
import CharRange from "./types/CharRange";
import _ from "lodash";

export default class TranslatorEngine {
    private static sharedInstance: TranslatorEngine;
    private constructor() { 
        if (TranslatorEngine.hasOwnProperty('sharedInstance'))
            return TranslatorEngine.sharedInstance;
        Object.defineProperty(TranslatorEngine, 'sharedInstance',{
            value: this,
            enumerable:false,
            writable:false,
            configurable:false
        });
    }

    public static getInstance(): TranslatorEngine {
        
        if (!TranslatorEngine.sharedInstance) {
            TranslatorEngine.sharedInstance = new TranslatorEngine();
        }

        return TranslatorEngine.sharedInstance;
    }


    public static readonly CHINESE_LOOKUP_MAX_LENGTH: number = 20;
    private dictionaryDirty: boolean = true;
    private hanVietDictionary: Map<string, string> = new Map<string, string>();
    private vietPhraseDictionary: Map<string, string> = new Map<string, string>();
    private thieuChuuDictionary: Map<string, string> = new Map<string, string>();
    private lacVietDictionary: Map<string, string> = new Map<string, string>();
    private cedictDictionary: Map<string, string> = new Map<string, string>();
    private chinesePhienAmEnglishDictionary: Map<string, string> = new Map<string, string>();
    private vietPhraseOneMeaningDictionary: Map<string, string> = new Map<string, string>();

    private onlyVietPhraseDictionary: Map<string, string> = new Map<string, string>();
    private onlyNameDictionary: Map<string, string> = new Map<string, string>();
    private onlyNameOneMeaningDictionary: Map<string, string> = new Map<string, string>();
    private onlyNameChinhDictionary: Map<string, string> = new Map<string, string>();
    private onlyNamePhuDictionary: Map<string, string> = new Map<string, string>();
    private luatNhanDictionary: Map<string, string> = new Map<string, string>();
    private pronounDictionary: Map<string, string> = new Map<string, string>();
    private pronounOneMeaningDictionary: Map<string, string> = new Map<string, string>();
    private nhanByDictionary: Nullable<Map<string, string>> = null;
    private nhanByOneMeaningDictionary: Nullable<Map<string, string>> = null;


    public lastTranslatedWord_HanViet:string = "";
    public lastTranslatedWord_VietPhrase:string = "";
    public lastTranslatedWord_VietPhraseOneMeaning:string = "";

    public applicationPath: string = "";

    public isDictionaryDirty() {
        return this.dictionaryDirty
    }

    public setDictionaryDirty(dirty: boolean) {
        this.dictionaryDirty = dirty;
    }

    public getVietPhraseOrNameValueFromKey(key: string) : Nullable<string>
    {
        const value = this.vietPhraseDictionary.get(key);
        if (isNullOrEmpty(value))
        {
            return null;
        }
        return value;
    }

    public getVietPhraseValueFromKey(key: string) : Nullable<string>
    {
        const value = this.onlyVietPhraseDictionary.get(key);
        if (isNullOrEmpty(value))
        {
            return null;
        }
        return value;
    }

    public getOnlyNameValueFromKey(key: string) : Nullable<string> {
        const value = this.onlyNameDictionary.get(key);
        if (isNullOrEmpty(value))
        {
            return null;
        }
        return value;
    }

    public getNameValueFromKey(key: string, isNameChinh: boolean) : Nullable<string> {
        let dictionary = isNameChinh ? this.onlyNameChinhDictionary : this.onlyNamePhuDictionary;
        const value = dictionary.get(key);
        if (isNullOrEmpty(value))
        {
            return null;
        }
        return value;
    }

    public isChineseCharacter(char: string) : boolean {
        console.log("TranslatorEngine >> isChineseCharacter >>  TranslatorEngine.hanVietDictionary: ", JSON.stringify(this.hanVietDictionary))
        const value = this.hanVietDictionary.get(char);
        return !isNullOrEmpty(value);
    }

    public allCharacterIsChinese(text: string) : boolean
    {
        for (let i = 0; i < text.length; i++)
        {
            let character = text[i];
            if (!this.isChineseCharacter(character))
            {
                return false;
            }
        }
        return true;
    }

    public doAppendTranslatedWord(result: string, translatedText: string, lastTranslatedWord: string, startIndexOfNextTranslatedText: number)  : { [key: string]: any }
    {
        let stringBuilder: string[] = [];
        stringBuilder.push(result)
        let lastTranslated:Nullable<string> = lastTranslatedWord
        let nextStartIndex:number = startIndexOfNextTranslatedText
        if (lastTranslated.endsWith("\n") || lastTranslated.endsWith("\t")
            || lastTranslated.endsWith(". ") || lastTranslated.endsWith("\"")
            || lastTranslated.endsWith("'") || lastTranslated.endsWith("? ")
            || lastTranslated.endsWith("! ") || lastTranslated.endsWith(".\" ")
            || lastTranslated.endsWith("?\" ") || lastTranslated.endsWith("!\" ")
            || lastTranslated.endsWith(": "))
        {
            lastTranslated = StringUtil.toUpperCase(translatedText)
        }
        else if (lastTranslated.endsWith(" ") || lastTranslated.endsWith("("))
        {
            lastTranslated = translatedText
        }
        else
        {
            lastTranslated = " " + translatedText
        }
        if ((isNullOrEmpty(translatedText) || translatedText[0] === ',' || translatedText[0] === '.' || translatedText[0] === '?' || translatedText[0] === '!') && 0 < result.length && result[result.length - 1] === ' ')
        {
            stringBuilder.splice(result.length - 1, 1)
            nextStartIndex--
        }
        stringBuilder.push(lastTranslated)
        return {"lastTranslated" : lastTranslated, "result" : stringBuilder.join(""), "nextStartIndex" : nextStartIndex }
    }

    public appendTranslatedWord(result: string, translatedText: string, lastTranslatedWord: string) : { [key: string]: any }
    {
        const num:number = 0
        const resultMapping: { [key: string]: any } = this.doAppendTranslatedWord(result, translatedText, lastTranslatedWord, num)
        return {"lastTranslated" : resultMapping["lastTranslated"], "result" : resultMapping["result"], "nextStartIndex" : resultMapping["nextStartIndex"]}
    }

    public chineseCharacterToHanViet(chinese: string): string {
        var result = ""
        if (chinese == ' ') {
            return result
        }
        if (!this.hanVietDictionary.has(chinese)) {
            result = StringUtil.toNarrow(chinese)
        } else {
            result = this.hanVietDictionary.get(chinese) as string
        }
        return result
    }

    public chineseToHanViet(chinese: string) : { [key: string]: any }
    {
        let result:{ [key: string]: any } = {}
        this.lastTranslatedWord_HanViet = ""

        let list:Array<CharRange> = []
        let stringBuilder:Array<string> = []
        let length:number = chinese.length
        for (let i = 0; i < length - 1; i++) {
            let length2:number = stringBuilder.join("").length
            let c:string = chinese[i]
            let character:string = chinese[i + 1];
            console.log("TranslatorEngine >> chineseToHanViet >> c: ", c);
            console.log("TranslatorEngine >> chineseToHanViet >> c is Chinese: ", this.isChineseCharacter(c));
            console.log("TranslatorEngine >> chineseToHanViet >> character: ", character);
            console.log("TranslatorEngine >> chineseToHanViet >> character is Chinese: ", this.isChineseCharacter(character));
            if (this.isChineseCharacter(c))
            {
                if (this.isChineseCharacter(character))
                {
                    let appendResult = this.doAppendTranslatedWord(stringBuilder.join(""), this.chineseCharacterToHanViet(c), this.lastTranslatedWord_HanViet, length2)
                    // console.log(`c: ${c}, appendResult: ${JSON.stringify(appendResult)}`);
                    stringBuilder.splice(0, stringBuilder.length);
                    stringBuilder.push(appendResult["result"])
                    this.lastTranslatedWord_HanViet = appendResult["lastTranslated"]
                    length2 = appendResult["nextStartIndex"]

                    stringBuilder.push(" ")
                    this.lastTranslatedWord_HanViet += " "
                    list.push(new CharRange(length2, this.chineseCharacterToHanViet(c).length))
                }
                else
                {
                    let appendResult = this.doAppendTranslatedWord(stringBuilder.join(""), this.chineseCharacterToHanViet(c), this.lastTranslatedWord_HanViet, length2)
                    stringBuilder.splice(0, stringBuilder.length);
                    stringBuilder.push(appendResult["result"])
                    this.lastTranslatedWord_HanViet = appendResult["lastTranslated"]
                    length2 = appendResult["nextStartIndex"]
                    list.push(new CharRange(length2, this.chineseCharacterToHanViet(c).length))
                }
            }
            else
            {
                stringBuilder.push(c)
                this.lastTranslatedWord_HanViet += c
                list.push(new CharRange(length2, 1))
            }
        }
        if (this.isChineseCharacter(chinese[length - 1]))
        {
            let appendResult = this.appendTranslatedWord(stringBuilder.join(""), this.chineseCharacterToHanViet(chinese[length - 1]), this.lastTranslatedWord_HanViet)
            // console.log(`chinese[length - 1]: ${chinese[length - 1]}, appendResult: ${JSON.stringify(appendResult)}`);
            stringBuilder.splice(0, stringBuilder.length);
            stringBuilder.push(appendResult["result"])

            this.lastTranslatedWord_HanViet = result["lastTranslated"]
            list.push(new CharRange(stringBuilder.join("").length, this.chineseCharacterToHanViet(chinese[length - 1]).length))
        }
        else
        {
            stringBuilder.push(chinese[length - 1]);
            this.lastTranslatedWord_HanViet += chinese[length - 1]
            list.push(new CharRange(stringBuilder.join("").length, 1))
        }
        
        this.lastTranslatedWord_HanViet = ""
        result["text"] = chinese
        result["result"] = stringBuilder.join("")
        result["mapping"] = list
        console.log("TranslatorEngine >> chineseToHanViet >> result: ", JSON.stringify(result));
        return result
    }

    public parseIniToMap(fileContent: string): Map<string, any> {
      let result: Map<string, any> = new Map<string, any>();
      let lines = fileContent.split('\n');
      for(let line of lines) {
        const parts = line.split('=');
        if (parts.length > 1) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          result.set(key, value);
        }
      }
      return result
    }

    public setHanVietDictionary(content: Map<string, any>) {
        this.hanVietDictionary.clear();
        content.forEach((value: any, key: string) => {
            this.hanVietDictionary.set(key, value as string);
        });

        console.log("setHanVietDictionary >> this.hanVietDictionary: ", JSON.stringify(this.hanVietDictionary));

    }
    
    public init(path: string) {
        this.applicationPath = path;

        // TranslatorEngine.hanVietDictionary = await Config.read(`${prefixPath}/ChinesePhienAmWords.txt`);
        // TranslatorEngine.vietPhraseDictionary = await Config.read(`${prefixPath}/VietPhrase.txt`);
        // TranslatorEngine.chinesePhienAmEnglishDictionary = await Config.read(`${prefixPath}/ChinesePhienAmEnglishWords.txt`);
        // TranslatorEngine.thieuChuuDictionary = await Config.read(`${prefixPath}/ThieuChuu.txt`);
        // TranslatorEngine.lacVietDictionary = await Config.read(`${prefixPath}/LacViet.txt`);
        // TranslatorEngine.luatNhanDictionary = await Config.read(`${prefixPath}/LuatNhan.txt`);
    }
}