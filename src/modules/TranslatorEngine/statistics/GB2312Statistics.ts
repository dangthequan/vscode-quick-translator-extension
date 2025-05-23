import EUCStatistics from "./EUCStatistics";

export default class GB2312Statistics extends EUCStatistics {
    static m_FirstByteFreq: number[];
    static m_FirstByteStdDev: number;
    static m_FirstByteMean: number;
    static m_FirstByteWeight: number;
    static m_SecondByteFreq: number[];
    static m_SecondByteStdDev: number;
    static m_SecondByteMean: number;
    static m_SecondByteWeight: number;

    public firstByteFreq(): number[] {
        return GB2312Statistics.m_FirstByteFreq;
    }
    public firstByteStdDev(): number {
        return GB2312Statistics.m_FirstByteStdDev;
    }
    public firstByteMean(): number {
        return GB2312Statistics.m_FirstByteMean;
    }
    public firstByteWeight(): number {
        return GB2312Statistics.m_FirstByteWeight;
    }
    public secondByteFreq(): number[] {
        return GB2312Statistics.m_SecondByteFreq;
    }
    public secondByteStdDev(): number {
        return GB2312Statistics.m_SecondByteStdDev;
    }
    public secondByteMean(): number {
        return GB2312Statistics.m_SecondByteMean;
    }
    public secondByteWeight(): number {
        return GB2312Statistics.m_SecondByteWeight;
    }
    
    constructor() {
        super()

        GB2312Statistics.m_FirstByteFreq = [
            0.011628, // FreqH[a1]
            0.000000, // FreqH[a2]
            0.000000, // FreqH[a3]
            0.000000, // FreqH[a4]
            0.000000, // FreqH[a5]
            0.000000, // FreqH[a6]
            0.000000, // FreqH[a7]
            0.000000, // FreqH[a8]
            0.000000, // FreqH[a9]
            0.000000, // FreqH[aa]
            0.000000, // FreqH[ab]
            0.000000, // FreqH[ac]
            0.000000, // FreqH[ad]
            0.000000, // FreqH[ae]
            0.000000, // FreqH[af]
            0.011628, // FreqH[b0]
            0.012403, // FreqH[b1]
            0.009302, // FreqH[b2]
            0.003876, // FreqH[b3]
            0.017829, // FreqH[b4]
            0.037209, // FreqH[b5]
            0.008527, // FreqH[b6]
            0.010078, // FreqH[b7]
            0.019380, // FreqH[b8]
            0.054264, // FreqH[b9]
            0.010078, // FreqH[ba]
            0.041085, // FreqH[bb]
            0.020930, // FreqH[bc]
            0.018605, // FreqH[bd]
            0.010078, // FreqH[be]
            0.013178, // FreqH[bf]
            0.016279, // FreqH[c0]
            0.006202, // FreqH[c1]
            0.009302, // FreqH[c2]
            0.017054, // FreqH[c3]
            0.011628, // FreqH[c4]
            0.008527, // FreqH[c5]
            0.004651, // FreqH[c6]
            0.006202, // FreqH[c7]
            0.017829, // FreqH[c8]
            0.024806, // FreqH[c9]
            0.020155, // FreqH[ca]
            0.013953, // FreqH[cb]
            0.032558, // FreqH[cc]
            0.035659, // FreqH[cd]
            0.068217, // FreqH[ce]
            0.010853, // FreqH[cf]
            0.036434, // FreqH[d0]
            0.117054, // FreqH[d1]
            0.027907, // FreqH[d2]
            0.100775, // FreqH[d3]
            0.010078, // FreqH[d4]
            0.017829, // FreqH[d5]
            0.062016, // FreqH[d6]
            0.012403, // FreqH[d7]
            0.000000, // FreqH[d8]
            0.000000, // FreqH[d9]
            0.000000, // FreqH[da]
            0.000000, // FreqH[db]
            0.000000, // FreqH[dc]
            0.000000, // FreqH[dd]
            0.000000, // FreqH[de]
            0.000000, // FreqH[df]
            0.000000, // FreqH[e0]
            0.000000, // FreqH[e1]
            0.000000, // FreqH[e2]
            0.000000, // FreqH[e3]
            0.000000, // FreqH[e4]
            0.000000, // FreqH[e5]
            0.000000, // FreqH[e6]
            0.000000, // FreqH[e7]
            0.000000, // FreqH[e8]
            0.000000, // FreqH[e9]
            0.001550, // FreqH[ea]
            0.000000, // FreqH[eb]
            0.000000, // FreqH[ec]
            0.000000, // FreqH[ed]
            0.000000, // FreqH[ee]
            0.000000, // FreqH[ef]
            0.000000, // FreqH[f0]
            0.000000, // FreqH[f1]
            0.000000, // FreqH[f2]
            0.000000, // FreqH[f3]
            0.000000, // FreqH[f4]
            0.000000, // FreqH[f5]
            0.000000, // FreqH[f6]
            0.000000, // FreqH[f7]
            0.000000, // FreqH[f8]
            0.000000, // FreqH[f9]
            0.000000, // FreqH[fa]
            0.000000, // FreqH[fb]
            0.000000, // FreqH[fc]
            0.000000, // FreqH[fd]
            0.000000  // FreqH[fe]
        ];
                
        GB2312Statistics.m_FirstByteStdDev = 0.020081; // Lead Byte StdDev
        GB2312Statistics.m_FirstByteMean = 0.010638; // Lead Byte Mean
        GB2312Statistics.m_FirstByteWeight = 0.586533; // Lead Byte Weight

        GB2312Statistics.m_SecondByteFreq = [
            0.006202, // FreqL[a1]
            0.031008, // FreqL[a2]
            0.005426, // FreqL[a3]
            0.003101, // FreqL[a4]
            0.001550, // FreqL[a5]
            0.003101, // FreqL[a6]
            0.082171, // FreqL[a7]
            0.014729, // FreqL[a8]
            0.006977, // FreqL[a9]
            0.001550, // FreqL[aa]
            0.013953, // FreqL[ab]
            0.000000, // FreqL[ac]
            0.013953, // FreqL[ad]
            0.010078, // FreqL[ae]
            0.008527, // FreqL[af]
            0.006977, // FreqL[b0]
            0.004651, // FreqL[b1]
            0.003101, // FreqL[b2]
            0.003101, // FreqL[b3]
            0.003101, // FreqL[b4]
            0.008527, // FreqL[b5]
            0.003101, // FreqL[b6]
            0.005426, // FreqL[b7]
            0.005426, // FreqL[b8]
            0.005426, // FreqL[b9]
            0.003101, // FreqL[ba]
            0.001550, // FreqL[bb]
            0.006202, // FreqL[bc]
            0.014729, // FreqL[bd]
            0.010853, // FreqL[be]
            0.000000, // FreqL[bf]
            0.011628, // FreqL[c0]
            0.000000, // FreqL[c1]
            0.031783, // FreqL[c2]
            0.013953, // FreqL[c3]
            0.030233, // FreqL[c4]
            0.039535, // FreqL[c5]
            0.008527, // FreqL[c6]
            0.015504, // FreqL[c7]
            0.000000, // FreqL[c8]
            0.003101, // FreqL[c9]
            0.008527, // FreqL[ca]
            0.016279, // FreqL[cb]
            0.005426, // FreqL[cc]
            0.001550, // FreqL[cd]
            0.013953, // FreqL[ce]
            0.013953, // FreqL[cf]
            0.044961, // FreqL[d0]
            0.003101, // FreqL[d1]
            0.004651, // FreqL[d2]
            0.006977, // FreqL[d3]
            0.001550, // FreqL[d4]
            0.005426, // FreqL[d5]
            0.012403, // FreqL[d6]
            0.001550, // FreqL[d7]
            0.015504, // FreqL[d8]
            0.000000, // FreqL[d9]
            0.006202, // FreqL[da]
            0.001550, // FreqL[db]
            0.000000, // FreqL[dc]
            0.007752, // FreqL[dd]
            0.006977, // FreqL[de]
            0.001550, // FreqL[df]
            0.009302, // FreqL[e0]
            0.011628, // FreqL[e1]
            0.004651, // FreqL[e2]
            0.010853, // FreqL[e3]
            0.012403, // FreqL[e4]
            0.017829, // FreqL[e5]
            0.005426, // FreqL[e6]
            0.024806, // FreqL[e7]
            0.000000, // FreqL[e8]
            0.006202, // FreqL[e9]
            0.000000, // FreqL[ea]
            0.082171, // FreqL[eb]
            0.015504, // FreqL[ec]
            0.004651, // FreqL[ed]
            0.000000, // FreqL[ee]
            0.006977, // FreqL[ef]
            0.004651, // FreqL[f0]
            0.000000, // FreqL[f1]
            0.008527, // FreqL[f2]
            0.012403, // FreqL[f3]
            0.004651, // FreqL[f4]
            0.003876, // FreqL[f5]
            0.003101, // FreqL[f6]
            0.022481, // FreqL[f7]
            0.024031, // FreqL[f8]
            0.001550, // FreqL[f9]
            0.047287, // FreqL[fa]
            0.009302, // FreqL[fb]
            0.001550, // FreqL[fc]
            0.005426, // FreqL[fd]
            0.017054  // FreqL[fe]
        ];

        GB2312Statistics.m_SecondByteStdDev = 0.014156; // Trail Byte StdDev
        GB2312Statistics.m_SecondByteMean = 0.010638; // Trail Byte Mean
        GB2312Statistics.m_SecondByteWeight = 0.413467; // Trial Byte Weight
    }
    
}