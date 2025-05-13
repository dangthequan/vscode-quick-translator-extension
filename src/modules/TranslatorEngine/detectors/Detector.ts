import PSMDetector from "./PSMDetector";
import ICharsetDetector from "./ICharsetDetector";
import ICharsetDetectionObserver from "./ICharsetDetectionObserver";
import { Nullable } from "../types/Types";

export default class Detector extends PSMDetector implements ICharsetDetector {
    mObserver: Nullable<ICharsetDetectionObserver> = null
    constructor() {
        super();
    }

    public init(observer: ICharsetDetectionObserver): void {
        this.mObserver = observer;
    }
    
    public doIt(aBuf: Uint8Array, aLen: number, oDontFeedMe: boolean): boolean {
        if (aBuf == null || oDontFeedMe )
            return false;

        this.handleData(aBuf, aLen) ;	
        return this.mDone;
    }
    public done(): void {
        this.dataEnd();
    }   

    public override report(charset: string) {
        if (this.mObserver != null)
            this.mObserver?.notify(charset)  ;
    }
    
    public isAscii(aBuf: Uint8Array, aLen: number) : boolean {
        for(let i=0; i<aLen; i++) {
            if ((0x0080 & aBuf[i]) !== 0) {
                return false ;
            }
        }
        return true ;
    }
}