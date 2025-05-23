import EUCStatistics from "./EUCStatistics";

export default class EUCTWStatistics extends EUCStatistics {
    static m_FirstByteFreq: number[];
    static m_FirstByteStdDev: number;
    static m_FirstByteMean: number;
    static m_FirstByteWeight: number;
    static m_SecondByteFreq: number[];
    static m_SecondByteStdDev: number;
    static m_SecondByteMean: number;
    static m_SecondByteWeight: number;

    public firstByteFreq(): number[] {
        return EUCTWStatistics.m_FirstByteFreq;
    }
    public firstByteStdDev(): number {
        return EUCTWStatistics.m_FirstByteStdDev;
    }
    public firstByteMean(): number {
        return EUCTWStatistics.m_FirstByteMean;
    }
    public firstByteWeight(): number {
        return EUCTWStatistics.m_FirstByteWeight;
    }
    public secondByteFreq(): number[] {
        return EUCTWStatistics.m_SecondByteFreq;
    }
    public secondByteStdDev(): number {
        return EUCTWStatistics.m_SecondByteStdDev;
    }
    public secondByteMean(): number {
        return EUCTWStatistics.m_SecondByteMean;
    }
    public secondByteWeight(): number {
        return EUCTWStatistics.m_SecondByteWeight;
    }
    
    constructor() {
        super()

        EUCTWStatistics.m_FirstByteFreq = [
            0.000000, // FreqH[a1]
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
            0.000000, // FreqH[b0]
            0.000000, // FreqH[b1]
            0.000000, // FreqH[b2]
            0.000000, // FreqH[b3]
            0.000000, // FreqH[b4]
            0.000000, // FreqH[b5]
            0.000000, // FreqH[b6]
            0.000000, // FreqH[b7]
            0.000000, // FreqH[b8]
            0.000000, // FreqH[b9]
            0.000000, // FreqH[ba]
            0.000000, // FreqH[bb]
            0.000000, // FreqH[bc]
            0.000000, // FreqH[bd]
            0.000000, // FreqH[be]
            0.000000, // FreqH[bf]
            0.000000, // FreqH[c0]
            0.000000, // FreqH[c1]
            0.000000, // FreqH[c2]
            0.000000, // FreqH[c3]
            0.119286, // FreqH[c4]
            0.052233, // FreqH[c5]
            0.044126, // FreqH[c6]
            0.052494, // FreqH[c7]
            0.045906, // FreqH[c8]
            0.019038, // FreqH[c9]
            0.032465, // FreqH[ca]
            0.026252, // FreqH[cb]
            0.025502, // FreqH[cc]
            0.015963, // FreqH[cd]
            0.052493, // FreqH[ce]
            0.019256, // FreqH[cf]
            0.015137, // FreqH[d0]
            0.031782, // FreqH[d1]
            0.017370, // FreqH[d2]
            0.018494, // FreqH[d3]
            0.015575, // FreqH[d4]
            0.016621, // FreqH[d5]
            0.007444, // FreqH[d6]
            0.011642, // FreqH[d7]
            0.013916, // FreqH[d8]
            0.019159, // FreqH[d9]
            0.016445, // FreqH[da]
            0.007851, // FreqH[db]
            0.011079, // FreqH[dc]
            0.022842, // FreqH[dd]
            0.015513, // FreqH[de]
            0.010033, // FreqH[df]
            0.009950, // FreqH[e0]
            0.010347, // FreqH[e1]
            0.013103, // FreqH[e2]
            0.015371, // FreqH[e3]
            0.012502, // FreqH[e4]
            0.007436, // FreqH[e5]
            0.018253, // FreqH[e6]
            0.014134, // FreqH[e7]
            0.008907, // FreqH[e8]
            0.005411, // FreqH[e9]
            0.009570, // FreqH[ea]
            0.013598, // FreqH[eb]
            0.006092, // FreqH[ec]
            0.007409, // FreqH[ed]
            0.008432, // FreqH[ee]
            0.005816, // FreqH[ef]
            0.009349, // FreqH[f0]
            0.005472, // FreqH[f1]
            0.007170, // FreqH[f2]
            0.007420, // FreqH[f3]
            0.003681, // FreqH[f4]
            0.007523, // FreqH[f5]
            0.004610, // FreqH[f6]
            0.006154, // FreqH[f7]
            0.003348, // FreqH[f8]
            0.005074, // FreqH[f9]
            0.005922, // FreqH[fa]
            0.005254, // FreqH[fb]
            0.004682, // FreqH[fc]
            0.002093, // FreqH[fd]
            0.000000  // FreqH[fe]
        ];
                
        EUCTWStatistics.m_FirstByteStdDev = 0.016681; // Lead Byte StdDev
        EUCTWStatistics.m_FirstByteMean = 0.010638; // Lead Byte Mean
        EUCTWStatistics.m_FirstByteWeight = 0.715599; // Lead Byte Weight

        EUCTWStatistics.m_SecondByteFreq = [
            0.028933, // FreqL[a1]
            0.011371, // FreqL[a2]
            0.011053, // FreqL[a3]
            0.007232, // FreqL[a4]
            0.010192, // FreqL[a5]
            0.004093, // FreqL[a6]
            0.015043, // FreqL[a7]
            0.011752, // FreqL[a8]
            0.022387, // FreqL[a9]
            0.008410, // FreqL[aa]
            0.012448, // FreqL[ab]
            0.007473, // FreqL[ac]
            0.003594, // FreqL[ad]
            0.007139, // FreqL[ae]
            0.018912, // FreqL[af]
            0.006083, // FreqL[b0]
            0.003302, // FreqL[b1]
            0.010215, // FreqL[b2]
            0.008791, // FreqL[b3]
            0.024236, // FreqL[b4]
            0.014107, // FreqL[b5]
            0.014108, // FreqL[b6]
            0.010303, // FreqL[b7]
            0.009728, // FreqL[b8]
            0.007877, // FreqL[b9]
            0.009719, // FreqL[ba]
            0.007952, // FreqL[bb]
            0.021028, // FreqL[bc]
            0.005764, // FreqL[bd]
            0.009341, // FreqL[be]
            0.006591, // FreqL[bf]
            0.012517, // FreqL[c0]
            0.005921, // FreqL[c1]
            0.008982, // FreqL[c2]
            0.008771, // FreqL[c3]
            0.012802, // FreqL[c4]
            0.005926, // FreqL[c5]
            0.008342, // FreqL[c6]
            0.003086, // FreqL[c7]
            0.006843, // FreqL[c8]
            0.007576, // FreqL[c9]
            0.004734, // FreqL[ca]
            0.016404, // FreqL[cb]
            0.008803, // FreqL[cc]
            0.008071, // FreqL[cd]
            0.005349, // FreqL[ce]
            0.008566, // FreqL[cf]
            0.010840, // FreqL[d0]
            0.015401, // FreqL[d1]
            0.031904, // FreqL[d2]
            0.008670, // FreqL[d3]
            0.011479, // FreqL[d4]
            0.010936, // FreqL[d5]
            0.007617, // FreqL[d6]
            0.008995, // FreqL[d7]
            0.008114, // FreqL[d8]
            0.008658, // FreqL[d9]
            0.005934, // FreqL[da]
            0.010452, // FreqL[db]
            0.009142, // FreqL[dc]
            0.004519, // FreqL[dd]
            0.008339, // FreqL[de]
            0.007476, // FreqL[df]
            0.007027, // FreqL[e0]
            0.006025, // FreqL[e1]
            0.021804, // FreqL[e2]
            0.024248, // FreqL[e3]
            0.015895, // FreqL[e4]
            0.003768, // FreqL[e5]
            0.010171, // FreqL[e6]
            0.010007, // FreqL[e7]
            0.010178, // FreqL[e8]
            0.008316, // FreqL[e9]
            0.006832, // FreqL[ea]
            0.006364, // FreqL[eb]
            0.009141, // FreqL[ec]
            0.009148, // FreqL[ed]
            0.012081, // FreqL[ee]
            0.011914, // FreqL[ef]
            0.004464, // FreqL[f0]
            0.014257, // FreqL[f1]
            0.006907, // FreqL[f2]
            0.011292, // FreqL[f3]
            0.018622, // FreqL[f4]
            0.008149, // FreqL[f5]
            0.004636, // FreqL[f6]
            0.006612, // FreqL[f7]
            0.013478, // FreqL[f8]
            0.012614, // FreqL[f9]
            0.005186, // FreqL[fa]
            0.048285, // FreqL[fb]
            0.006816, // FreqL[fc]
            0.006743, // FreqL[fd]
            0.008671  // FreqL[fe]
        ];

        EUCTWStatistics.m_SecondByteStdDev = 0.006630; // Trail Byte StdDev
        EUCTWStatistics.m_SecondByteMean = 0.010638; // Trail Byte Mean
        EUCTWStatistics.m_SecondByteWeight = 0.284401; // Trial Byte Weight
    }
    
}