import Big5Statistics from "../statistics/Big5Statistics";
import EUCJPStatistics from "../statistics/EUCJPStatistics";
import EUCKRStatistics from "../statistics/EUCKRStatistics";
import EUCStatistics from "../statistics/EUCStatistics";
import EUCTWStatistics from "../statistics/EUCTWStatistics";
import GB2312Statistics from "../statistics/GB2312Statistics";
import BIG5Verifier from "../verifiers/BIG5Verifier";
import CP1252Verifier from "../verifiers/CP1252Verifier";
import EUCJPVerifier from "../verifiers/EUCJPVerifier";
import EUCKRVerifier from "../verifiers/EUCKRVerifier";
import EUCTWVerifier from "../verifiers/EUCTWVerifier";
import GB18030Verifier from "../verifiers/GB18030Verifier";
import GB2312Verifier from "../verifiers/GB2312Verifier";
import HZVerifier from "../verifiers/HZVerifier";
import ISO2022CNVerifier from "../verifiers/ISO2022CNVerifier";
import ISO2022JPVerifier from "../verifiers/ISO2022JPVerifier";
import ISO2022KRVerifier from "../verifiers/ISO2022KRVerifier";
import SJISVerifier from "../verifiers/SJISVerifier";
import UCS2BEVerifier from "../verifiers/UCS2BEVerifier";
import UCS2LEVerifier from "../verifiers/UCS2LEVerifier";
import UTF8Verifier from "../verifiers/UTF8Verifier";
import Verifier from "../verifiers/Verifier";
import EUCSampler from "./EUCSampler";

export default class PSMDetector {
    public static readonly ALL: number = 0;
    public static readonly JAPANESE: number = 1;
    public static readonly CHINESE: number = 2;
    public static readonly SIMPLIFIED_CHINESE: number = 3;
    public static readonly TRADITIONAL_CHINESE: number = 4;
    public static readonly KOREAN: number = 5;
    public static readonly NO_OF_LANGUAGES: number = 6;
    public static readonly MAX_VERIFIERS: number = 16;
    private mVerifier: Verifier[] | undefined | null;
    private mStatisticsData: Array<EUCStatistics | undefined | null> | undefined | null;
    private mSampler: EUCSampler = new EUCSampler();
    private mState: number[] = new Array<number>(PSMDetector.MAX_VERIFIERS);
    private mItemIdx: number[] = new Array<number>(PSMDetector.MAX_VERIFIERS);
    private mItems: number = 0;
    private mClassItems: number = 0;
    protected mDone: boolean = false;
    protected mRunSampler: boolean = false;
    protected mClassRunSampler: boolean = false;
    
    constructor() {
       this.initVerifiers(PSMDetector.ALL);
       this.reset();
    }
    
    public static createWithLang(langFlag: number) {
       const detector = new PSMDetector();
       detector.initVerifiers(langFlag);
       detector.reset();
       return detector;
    }
    
    public static createWith(aItems: number, aVerifierSet: Verifier[], aStatisticsSet: EUCStatistics[]) {
       const detector = new PSMDetector();
       detector.mClassRunSampler = (aStatisticsSet != null);
       detector.mStatisticsData = aStatisticsSet;
       detector.mVerifier = aVerifierSet;
       detector.mClassItems = aItems;
       detector.reset();
    }
    
    public reset(): void {
       this.mRunSampler = this.mClassRunSampler;
       this.mDone = false;
       this.mItems = this.mClassItems;
       for(let i=0; i<this.mItems; i++) {
          this.mState[i] = 0;
          this.mItemIdx[i] = i;
       }
       this.mSampler.reset();
    }

    protected initVerifiers(currVerSet: number): void {
        let idx: number = 0;
        let currVerifierSet: number;
        if (currVerSet >= 0 && currVerSet < PSMDetector.NO_OF_LANGUAGES) {
            currVerifierSet = currVerSet;
        }
        else {
            currVerifierSet = PSMDetector.ALL;
        }
        this.mVerifier = null;
        this.mStatisticsData = null;
        if (currVerifierSet == PSMDetector.TRADITIONAL_CHINESE) {
            this.mVerifier = [
                new UTF8Verifier(),
                new BIG5Verifier(),
                new ISO2022CNVerifier(),
                new EUCTWVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
            this.mStatisticsData = [
                null,
                new Big5Statistics(),
                null,
                new EUCTWStatistics(),
                null,
                null,
                null
            ];
        }
        else if (currVerifierSet == PSMDetector.KOREAN) {
            this.mVerifier = [
                new UTF8Verifier(),
                new EUCKRVerifier(),
                new ISO2022KRVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
        }
        //==========================================================
        else if ( currVerifierSet == PSMDetector.SIMPLIFIED_CHINESE ) {

            this.mVerifier = [
                new UTF8Verifier(),
                new GB2312Verifier(),
                new GB18030Verifier(),
                new ISO2022CNVerifier(),
                new HZVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
        }
        
        //==========================================================
        else if ( currVerifierSet == PSMDetector.JAPANESE ) {
        
            this.mVerifier = [
                new UTF8Verifier(),
                new SJISVerifier(),
                new EUCJPVerifier(),
                new ISO2022JPVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
        }
        //==========================================================
        else if ( currVerifierSet == PSMDetector.CHINESE ) {
        
            this.mVerifier = [
                new UTF8Verifier(),
                new GB2312Verifier(),
                new GB18030Verifier(),
                new BIG5Verifier(),
                new ISO2022CNVerifier(),
                new HZVerifier(),
                new EUCTWVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
        
            this.mStatisticsData = [
                null,
                new GB2312Statistics(),
                null,
                new Big5Statistics(),
                null,
                null,
                new EUCTWStatistics(),
                null,
                null,
                null
            ];
        }
        
        //==========================================================
        else if ( currVerifierSet == PSMDetector.ALL ) {
        
            this.mVerifier = [
                new UTF8Verifier(),
                new SJISVerifier(),
                new EUCJPVerifier(),
                new ISO2022JPVerifier(),
                new EUCKRVerifier(),
                new ISO2022KRVerifier(),
                new BIG5Verifier(),
                new EUCTWVerifier(),
                new GB2312Verifier(),
                new GB18030Verifier(),
                new ISO2022CNVerifier(),
                new HZVerifier(),
                new CP1252Verifier(),
                new UCS2BEVerifier(),
                new UCS2LEVerifier()
            ];
        
            this.mStatisticsData = [
                null,
                null,
                new EUCJPStatistics(),
                null,
                new EUCKRStatistics(),
                null,
                new Big5Statistics(),
                new EUCTWStatistics(),
                new GB2312Statistics(),
                null,
                null,
                null,
                null,
                null,
                null
            ];
        }
        
        this.mClassRunSampler = ( this.mStatisticsData != null ) ;
        this.mClassItems = this.mVerifier?.length || 0;
    }

    public report(charset: string): void {
        
    }

    public handleData(aBuf: Uint8Array, len: number): boolean {
        let i, j;
        let b, st;
        for (i = 0; i < len; i++) {
            b = aBuf[i];
            for (j = 0; j < this.mItems;) {
                st = Verifier.getNextState(this.mVerifier![this.mItemIdx[j]], b, this.mState[j]);
                // if (st != 0)
                // System.out.println( "state(0x" + Integer.toHexString(0xFF&b) +") =>"+ Integer.toHexString(st&0xFF)+ " " + mVerifier[mItemIdx[j]].charset());
                if (st == Verifier.eItsMe) {
                    // System.out.println( "eItsMe(0x" + Integer.toHexString(0xFF&b) +") =>"+ mVerifier[mItemIdx[j]].charset());
                    this.report(this.mVerifier![this.mItemIdx[j]].charset());
                    this.mDone = true;
                    return this.mDone;
                } else if (st == Verifier.eError) {
                    // System.out.println( "eNotMe(0x" + Integer.toHexString(0xFF&b) +") =>"+ mVerifier[mItemIdx[j]].charset());
                    this.mItems--;
                    if (j < this.mItems) {
                        this.mItemIdx[j] = this.mItemIdx[this.mItems];
                        this.mState[j] = this.mState[this.mItems];
                    }
                } else {
                    this.mState[j++] = st;
                }
            }
            if (this.mItems <= 1) {
                if (1 == this.mItems) {
                    this.report(this.mVerifier![this.mItemIdx[0]].charset());
                }
                this.mDone = true;
                return this.mDone;
            } else {
                let nonUCS2Num = 0;
                let nonUCS2Idx = 0;
                for (j = 0; j < this.mItems; j++) {
                    if (
                        !this.mVerifier![this.mItemIdx[j]].isUCS2() &&
                        !this.mVerifier![this.mItemIdx[j]].isUCS2()
                    ) {
                        nonUCS2Num++;
                        nonUCS2Idx = j;
                    }
                }
                if (1 == nonUCS2Num) {
                    this.report(this.mVerifier![this.mItemIdx[nonUCS2Idx]].charset());
                    this.mDone = true;
                    return this.mDone;
                }
            }
        }
        if (this.mRunSampler) this.sample(aBuf, len);
        return this.mDone;
    }

    public dataEnd(): void {
        if (this.mDone === true) {
            return;
        }
        if (this.mItems === 2) {
            if (this.mVerifier![this.mItemIdx[0]].charset() === "GB18030") {
                this.report(this.mVerifier![this.mItemIdx[1]].charset());
                this.mDone = true;
            } else if (this.mVerifier![this.mItemIdx[1]].charset() === "GB18030") {
                this.report(this.mVerifier![this.mItemIdx[0]].charset());
                this.mDone = true;
            }
        }
        if (this.mRunSampler) {
            this.doSample(null, 0, true);
        }
    }

    public sample(aBuf: Uint8Array | null, aLen: number): void {
        this.doSample(aBuf, aLen, false);
    }

    public doSample(aBuf: Uint8Array | null, aLen: number, aLastChance: boolean): void {
        let possibleCandidateNum: number = 0;
        let j: number;
        let eucNum: number = 0;
        for (j = 0; j < this.mItems; j++) {
            if (this.mStatisticsData![this.mItemIdx[j]] !== null) {
                eucNum++;
            }
            if ((!this.mVerifier![this.mItemIdx[j]].isUCS2()) && (!(this.mVerifier![this.mItemIdx[j]].charset() === "GB18030"))) {
                possibleCandidateNum++;
            }
        }
        this.mRunSampler = (eucNum > 1) ;

        if (this.mRunSampler) {
            this.mRunSampler = this.mSampler.sample(aBuf, aLen);
            if (((aLastChance && this.mSampler.getSomeData()) ||
                this.mSampler.enoughData()) &&
                (eucNum === possibleCandidateNum)) {
                this.mSampler.calFreq();
                let bestIdx: number = -1;
                let eucCnt: number = 0;
                let bestScore: number = 0.0;
                for(j = 0; j < this.mItems; j++) {
                    if((null != this.mStatisticsData![this.mItemIdx[j]])  &&
                        (!(this.mVerifier![this.mItemIdx[j]].charset() == "Big5")))
                    {
                        let score = this.mSampler.getScore(
                            this.mStatisticsData![this.mItemIdx![j]]!.firstByteFreq(),
                            this.mStatisticsData![this.mItemIdx![j]]!.firstByteWeight(),
                            this.mStatisticsData![this.mItemIdx![j]]!.secondByteFreq(),
                            this.mStatisticsData![this.mItemIdx![j]]!.secondByteWeight() );
    //System.out.println("FequencyScore("+mVerifier[mItemIdx[j]].charset()+")= "+ score);
                        if(( 0 == eucCnt++) || (bestScore > score )) {
                            bestScore = score;
                            bestIdx = j;
                        } // if(( 0 == eucCnt++) || (bestScore > score )) 
                    } // if(null != ...)
                } // for
                if (bestIdx >= 0) {
                    this.report(this.mVerifier![this.mItemIdx[bestIdx]].charset());
                    this.mDone = true;
                }
            }  // if (eucNum == possibleCandidateNum)
        } // if(mRunSampler)
    }

    public getProbableCharsets(): string[] {
        if (this.mItems <= 0) {
            let nomatch: string[] = ["nomatch"];
            return nomatch;
        }
        let ret: string[] = new Array(this.mItems);
        for (let i = 0; i < this.mItems; i++) {
            ret[i] = this.mVerifier![this.mItemIdx[i]].charset();
        }
        return ret;
    }
 }
 
 