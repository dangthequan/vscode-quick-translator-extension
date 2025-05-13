export default class EUCSampler {
    mTotal: number = 0;
    mThreshold: number = 200;
    mState: number = 0;
    mFirstByteCnt: number[] = new Array(94);
    mSecondByteCnt: number[] = new Array(94);
    mFirstByteFreq: number[] = new Array(94);
    mSecondByteFreq: number[] = new Array(94);

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.mTotal = 0;
        this.mState = 0;
        for (let i = 0; i < 94; i++) {
            this.mFirstByteCnt[i] = this.mSecondByteCnt[i] = 0;
        }
    }

    public enoughData(): boolean {
        return this.mTotal > this.mThreshold;
    }

    public getSomeData(): boolean {
        return this.mTotal > 1;
    }

    public sample(aIn: Uint8Array | null, aLen: number): boolean {
        if (this.mState === 1) {
            return false;
        }
        let p: number = 0;
        // if(aLen + mTotal > 0x80000000) 
        //    aLen = 0x80000000 - mTotal;
        let i: number;
        for (i = 0; (i < aLen) && (1 !== this.mState); i++, p++) {
            switch (this.mState) {
                case 0:
                    if (aIn != null && (aIn[p] & 0x0080) !== 0) {
                        if ((0xff === (0xff & aIn[p])) || (0xa1 > (0xff & aIn[p]))) {
                            this.mState = 1;
                        } else {
                            this.mTotal++;
                            this.mFirstByteCnt[(0xff & aIn[p]) - 0xa1]++;
                            this.mState = 2;
                        }
                    }
                    break;
                case 1:
                    break;
                case 2:
                    if (aIn != null && (aIn[p] & 0x0080) !== 0) {
                        if ((0xff === (0xff & aIn[p])) || (0xa1 > (0xff & aIn[p]))) {
                            this.mState = 1;
                        } else {
                            this.mTotal++;
                            this.mSecondByteCnt[(0xff & aIn[p]) - 0xa1]++;
                            this.mState = 0;
                        }
                    } else {
                        this.mState = 1;
                    }
                    break;
                default:
                    this.mState = 1;
                    break;
            }
        }
        return (1 !== this.mState);
    }

    public calFreq(): void {
        for (let i = 0; i < 94; i++) {
            this.mFirstByteFreq[i] = this.mFirstByteCnt[i] / this.mTotal;
            this.mSecondByteFreq[i] = this.mSecondByteCnt[i] / this.mTotal;
        }
    }

    public getScore(aFirstByteFreq: number[], aFirstByteWeight: number,
        aSecondByteFreq: number[], aSecondByteWeight: number): number {
        return aFirstByteWeight * this.getScoreBetween(aFirstByteFreq, this.mFirstByteFreq) +
            aSecondByteWeight * this.getScoreBetween(aSecondByteFreq, this.mSecondByteFreq);
    }

    private getScoreBetween(array1: number[], array2: number[]): number {
        let s: number;
        let sum: number = 0.0;
        for (let i = 0; i < 94; i++) {
            s = array1[i] - array2[i];
            sum += s * s;
        }
        return Math.sqrt(sum) / 94.0;
    }
}

