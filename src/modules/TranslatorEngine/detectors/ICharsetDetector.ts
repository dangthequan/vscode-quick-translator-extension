import ICharsetDetectionObserver from "./ICharsetDetectionObserver";

export default interface ICharsetDetector {
    init(observer: ICharsetDetectionObserver): void;
    doIt(aBuf: Uint8Array, aLen: number, oDontFeedMe: boolean): boolean;
    done(): void;
}

