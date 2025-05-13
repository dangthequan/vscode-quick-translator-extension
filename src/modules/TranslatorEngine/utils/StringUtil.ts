import _ from 'lodash';
import { isNullOrEmpty } from '../types/Types';

export default class StringUtil {
    static toWide(str: string): string {
        const length: number = str.length;
        let i: number;
        for (i = 0; i < length; i++) {
            const c: string = str[i];
            if (c >= '!' && c <= '~') {
                break;
            }
        }
        if (i >= length) {
            return str;
        }
        const stringBuilder: string[] = [];
        for (i = 0; i < length; i++) {
            const c: string = str[i];
            if (c >= '!' && c <= '~') {
                stringBuilder.push(String.fromCharCode(c.charCodeAt(0) - '!'.charCodeAt(0) + '！'.charCodeAt(0)));
            } else {
                stringBuilder.push(c);
            }
        }
        return stringBuilder.join('');
    }
    
    static toNarrow(str: string): string {
        const length: number = str.length;
        let i: number;
        for (i = 0; i < length; i++) {
            const c: string = str[i];
            if (c >= '！' && c <= '～') {
                break;
            }
        }
        if (i >= length) {
            return str;
        }
        const stringBuilder: string[] = [];
        for (i = 0; i < length; i++) {
            const c: string = str[i];
            if (c >= '！' && c <= '～') {
                stringBuilder.push(String.fromCharCode(c.charCodeAt(0) - '！'.charCodeAt(0) + '!'.charCodeAt(0)));
            } else {
                stringBuilder.push(c);
            }
        }
        return stringBuilder.join('');
    }

    static toUpperCase(text: string) : string
    {
        if (isNullOrEmpty(text))
        {
            return text;
        }
        
        if (text.startsWith("[") && 2 <= text.length)
        {
            return "[" + text[1].toUpperCase() + ((text.length <= 2) ? "" : text.substring(2));
        }
        return text[0].toUpperCase() + ((text.length <= 1) ? "" : text.substring(1));
    }
    
    
}