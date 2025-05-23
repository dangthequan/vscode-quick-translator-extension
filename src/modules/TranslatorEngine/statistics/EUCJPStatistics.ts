import EUCStatistics from "./EUCStatistics";

export default class EUCJPStatistics extends EUCStatistics {
    static m_FirstByteFreq: number[];
    static m_FirstByteStdDev: number;
    static m_FirstByteMean: number;
    static m_FirstByteWeight: number;
    static m_SecondByteFreq: number[];
    static m_SecondByteStdDev: number;
    static m_SecondByteMean: number;
    static m_SecondByteWeight: number;

    public firstByteFreq(): number[] {
        return EUCJPStatistics.m_FirstByteFreq;
    }
    public firstByteStdDev(): number {
        return EUCJPStatistics.m_FirstByteStdDev;
    }
    public firstByteMean(): number {
        return EUCJPStatistics.m_FirstByteMean;
    }
    public firstByteWeight(): number {
        return EUCJPStatistics.m_FirstByteWeight;
    }
    public secondByteFreq(): number[] {
        return EUCJPStatistics.m_SecondByteFreq;
    }
    public secondByteStdDev(): number {
        return EUCJPStatistics.m_SecondByteStdDev;
    }
    public secondByteMean(): number {
        return EUCJPStatistics.m_SecondByteMean;
    }
    public secondByteWeight(): number {
        return EUCJPStatistics.m_SecondByteWeight;
    }
    
    constructor() {
        super()

        EUCJPStatistics.m_FirstByteFreq = [
            0.364808, // FreqH[a1]
            0.000000, // FreqH[a2]
            0.000000, // FreqH[a3]
            0.145325, // FreqH[a4]
            0.304891, // FreqH[a5]
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
            0.001835, // FreqH[b0]
            0.010771, // FreqH[b1]
            0.006462, // FreqH[b2]
            0.001157, // FreqH[b3]
            0.002114, // FreqH[b4]
            0.003231, // FreqH[b5]
            0.001356, // FreqH[b6]
            0.007420, // FreqH[b7]
            0.004189, // FreqH[b8]
            0.003231, // FreqH[b9]
            0.003032, // FreqH[ba]
            0.033190, // FreqH[bb]
            0.006303, // FreqH[bc]
            0.006064, // FreqH[bd]
            0.009973, // FreqH[be]
            0.002354, // FreqH[bf]
            0.003670, // FreqH[c0]
            0.009135, // FreqH[c1]
            0.001675, // FreqH[c2]
            0.002792, // FreqH[c3]
            0.002194, // FreqH[c4]
            0.014720, // FreqH[c5]
            0.011928, // FreqH[c6]
            0.000878, // FreqH[c7]
            0.013124, // FreqH[c8]
            0.001077, // FreqH[c9]
            0.009295, // FreqH[ca]
            0.003471, // FreqH[cb]
            0.002872, // FreqH[cc]
            0.002433, // FreqH[cd]
            0.000957, // FreqH[ce]
            0.001636, // FreqH[cf]
            0.000000, // FreqH[d0]
            0.000000, // FreqH[d1]
            0.000000, // FreqH[d2]
            0.000000, // FreqH[d3]
            0.000000, // FreqH[d4]
            0.000000, // FreqH[d5]
            0.000000, // FreqH[d6]
            0.000000, // FreqH[d7]
            0.000000, // FreqH[d8]
            0.000000, // FreqH[d9]
            0.000000, // FreqH[da]
            0.000000, // FreqH[db]
            0.000000, // FreqH[dc]
            0.000000, // FreqH[dd]
            0.000080, // FreqH[de]
            0.000279, // FreqH[df]
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
            0.000000, // FreqH[ea]
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
            0.000080, // FreqH[fd]
            0.000000  // FreqH[fe]
        ];
                
        EUCJPStatistics.m_FirstByteStdDev = 0.050407; // Lead Byte StdDev
        EUCJPStatistics.m_FirstByteMean = 0.010638; // Lead Byte Mean
        EUCJPStatistics.m_FirstByteWeight = 0.640871; // Lead Byte Weight

        EUCJPStatistics.m_SecondByteFreq = [
            0.002473, // FreqL[a1]
            0.039134, // FreqL[a2]
            0.152745, // FreqL[a3]
            0.009694, // FreqL[a4]
            0.000359, // FreqL[a5]
            0.022180, // FreqL[a6]
            0.000758, // FreqL[a7]
            0.004308, // FreqL[a8]
            0.000160, // FreqL[a9]
            0.002513, // FreqL[aa]
            0.003072, // FreqL[ab]
            0.001316, // FreqL[ac]
            0.003830, // FreqL[ad]
            0.001037, // FreqL[ae]
            0.003590, // FreqL[af]
            0.000957, // FreqL[b0]
            0.000160, // FreqL[b1]
            0.000239, // FreqL[b2]
            0.006462, // FreqL[b3]
            0.001596, // FreqL[b4]
            0.031554, // FreqL[b5]
            0.001316, // FreqL[b6]
            0.002194, // FreqL[b7]
            0.016555, // FreqL[b8]
            0.003271, // FreqL[b9]
            0.000678, // FreqL[ba]
            0.000598, // FreqL[bb]
            0.206438, // FreqL[bc]
            0.000718, // FreqL[bd]
            0.001077, // FreqL[be]
            0.003710, // FreqL[bf]
            0.001356, // FreqL[c0]
            0.001356, // FreqL[c1]
            0.000439, // FreqL[c2]
            0.004388, // FreqL[c3]
            0.005704, // FreqL[c4]
            0.000878, // FreqL[c5]
            0.010172, // FreqL[c6]
            0.007061, // FreqL[c7]
            0.014680, // FreqL[c8]
            0.000638, // FreqL[c9]
            0.025730, // FreqL[ca]
            0.002792, // FreqL[cb]
            0.000718, // FreqL[cc]
            0.001795, // FreqL[cd]
            0.091551, // FreqL[ce]
            0.000758, // FreqL[cf]
            0.003909, // FreqL[d0]
            0.000558, // FreqL[d1]
            0.031195, // FreqL[d2]
            0.007061, // FreqL[d3]
            0.001316, // FreqL[d4]
            0.022579, // FreqL[d5]
            0.006981, // FreqL[d6]
            0.007260, // FreqL[d7]
            0.001117, // FreqL[d8]
            0.000239, // FreqL[d9]
            0.012127, // FreqL[da]
            0.000878, // FreqL[db]
            0.003790, // FreqL[dc]
            0.001077, // FreqL[dd]
            0.000758, // FreqL[de]
            0.002114, // FreqL[df]
            0.002234, // FreqL[e0]
            0.000678, // FreqL[e1]
            0.002992, // FreqL[e2]
            0.003311, // FreqL[e3]
            0.023416, // FreqL[e4]
            0.001237, // FreqL[e5]
            0.002753, // FreqL[e6]
            0.005146, // FreqL[e7]
            0.002194, // FreqL[e8]
            0.007021, // FreqL[e9]
            0.008497, // FreqL[ea]
            0.013763, // FreqL[eb]
            0.011768, // FreqL[ec]
            0.006303, // FreqL[ed]
            0.001915, // FreqL[ee]
            0.000638, // FreqL[ef]
            0.008776, // FreqL[f0]
            0.000918, // FreqL[f1]
            0.003431, // FreqL[f2]
            0.057603, // FreqL[f3]
            0.000439, // FreqL[f4]
            0.000439, // FreqL[f5]
            0.000758, // FreqL[f6]
            0.002872, // FreqL[f7]
            0.001675, // FreqL[f8]
            0.011050, // FreqL[f9]
            0.000000, // FreqL[fa]
            0.000279, // FreqL[fb]
            0.012127, // FreqL[fc]
            0.000718, // FreqL[fd]
            0.007380  // FreqL[fe]
        ];

        EUCJPStatistics.m_SecondByteStdDev = 0.028247; // Trail Byte StdDev
        EUCJPStatistics.m_SecondByteMean = 0.010638; // Trail Byte Mean
        EUCJPStatistics.m_SecondByteWeight = 0.359129; // Trial Byte Weight
    }
    
}