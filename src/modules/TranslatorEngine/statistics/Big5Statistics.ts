import EUCStatistics from "./EUCStatistics";

export default class Big5Statistics extends EUCStatistics {
    static m_FirstByteFreq: number[];
    static m_FirstByteStdDev: number;
    static m_FirstByteMean: number;
    static m_FirstByteWeight: number;
    static m_SecondByteFreq: number[];
    static m_SecondByteStdDev: number;
    static m_SecondByteMean: number;
    static m_SecondByteWeight: number;

    public firstByteFreq(): number[] {
        return Big5Statistics.m_FirstByteFreq;
    }
    public firstByteStdDev(): number {
        return Big5Statistics.m_FirstByteStdDev;
    }
    public firstByteMean(): number {
        return Big5Statistics.m_FirstByteMean;
    }
    public firstByteWeight(): number {
        return Big5Statistics.m_FirstByteWeight;
    }
    public secondByteFreq(): number[] {
        return Big5Statistics.m_SecondByteFreq;
    }
    public secondByteStdDev(): number {
        return Big5Statistics.m_SecondByteStdDev;
    }
    public secondByteMean(): number {
        return Big5Statistics.m_SecondByteMean;
    }
    public secondByteWeight(): number {
        return Big5Statistics.m_SecondByteWeight;
    }
    
    constructor() {
        super()

        Big5Statistics.m_FirstByteFreq = [
            0.000000, // FreqH[a1]
            0.000000, // FreqH[a2]
            0.000000, // FreqH[a3]
            0.114427, // FreqH[a4]
            0.061058, // FreqH[a5]
            0.075598, // FreqH[a6]
            0.048386, // FreqH[a7]
            0.063966, // FreqH[a8]
            0.027094, // FreqH[a9]
            0.095787, // FreqH[aa]
            0.029525, // FreqH[ab]
            0.031331, // FreqH[ac]
            0.036915, // FreqH[ad]
            0.021805, // FreqH[ae]
            0.019349, // FreqH[af]
            0.037496, // FreqH[b0]
            0.018068, // FreqH[b1]
            0.012760, // FreqH[b2]
            0.030053, // FreqH[b3]
            0.017339, // FreqH[b4]
            0.016731, // FreqH[b5]
            0.019501, // FreqH[b6]
            0.011240, // FreqH[b7]
            0.032973, // FreqH[b8]
            0.016658, // FreqH[b9]
            0.015872, // FreqH[ba]
            0.021458, // FreqH[bb]
            0.012378, // FreqH[bc]
            0.017003, // FreqH[bd]
            0.020802, // FreqH[be]
            0.012454, // FreqH[bf]
            0.009239, // FreqH[c0]
            0.012829, // FreqH[c1]
            0.007922, // FreqH[c2]
            0.010079, // FreqH[c3]
            0.009815, // FreqH[c4]
            0.010104, // FreqH[c5]
            0.000000, // FreqH[c6]
            0.000000, // FreqH[c7]
            0.000000, // FreqH[c8]
            0.000053, // FreqH[c9]
            0.000035, // FreqH[ca]
            0.000105, // FreqH[cb]
            0.000031, // FreqH[cc]
            0.000088, // FreqH[cd]
            0.000027, // FreqH[ce]
            0.000027, // FreqH[cf]
            0.000026, // FreqH[d0]
            0.000035, // FreqH[d1]
            0.000024, // FreqH[d2]
            0.000034, // FreqH[d3]
            0.000375, // FreqH[d4]
            0.000025, // FreqH[d5]
            0.000028, // FreqH[d6]
            0.000020, // FreqH[d7]
            0.000024, // FreqH[d8]
            0.000028, // FreqH[d9]
            0.000031, // FreqH[da]
            0.000059, // FreqH[db]
            0.000040, // FreqH[dc]
            0.000030, // FreqH[dd]
            0.000079, // FreqH[de]
            0.000037, // FreqH[df]
            0.000040, // FreqH[e0]
            0.000023, // FreqH[e1]
            0.000030, // FreqH[e2]
            0.000027, // FreqH[e3]
            0.000064, // FreqH[e4]
            0.000020, // FreqH[e5]
            0.000027, // FreqH[e6]
            0.000025, // FreqH[e7]
            0.000074, // FreqH[e8]
            0.000019, // FreqH[e9]
            0.000023, // FreqH[ea]
            0.000021, // FreqH[eb]
            0.000018, // FreqH[ec]
            0.000017, // FreqH[ed]
            0.000035, // FreqH[ee]
            0.000021, // FreqH[ef]
            0.000019, // FreqH[f0]
            0.000025, // FreqH[f1]
            0.000017, // FreqH[f2]
            0.000037, // FreqH[f3]
            0.000018, // FreqH[f4]
            0.000018, // FreqH[f5]
            0.000019, // FreqH[f6]
            0.000022, // FreqH[f7]
            0.000033, // FreqH[f8]
            0.000032, // FreqH[f9]
            0.000000, // FreqH[fa]
            0.000000, // FreqH[fb]
            0.000000, // FreqH[fc]
            0.000000, // FreqH[fd]
            0.000000  // FreqH[fe]
        ];
                
        Big5Statistics.m_FirstByteStdDev = 0.020606; // Lead Byte StdDev
        Big5Statistics.m_FirstByteMean = 0.010638; // Lead Byte Mean
        Big5Statistics.m_FirstByteWeight = 0.675261; // Lead Byte Weight

        Big5Statistics.m_SecondByteFreq = [
            0.020256, // FreqL[a1]
            0.003293, // FreqL[a2]
            0.045811, // FreqL[a3]
            0.016650, // FreqL[a4]
            0.007066, // FreqL[a5]
            0.004146, // FreqL[a6]
            0.009229, // FreqL[a7]
            0.007333, // FreqL[a8]
            0.003296, // FreqL[a9]
            0.005239, // FreqL[aa]
            0.008282, // FreqL[ab]
            0.003791, // FreqL[ac]
            0.006116, // FreqL[ad]
            0.003536, // FreqL[ae]
            0.004024, // FreqL[af]
            0.016654, // FreqL[b0]
            0.009334, // FreqL[b1]
            0.005429, // FreqL[b2]
            0.033392, // FreqL[b3]
            0.006121, // FreqL[b4]
            0.008983, // FreqL[b5]
            0.002801, // FreqL[b6]
            0.004221, // FreqL[b7]
            0.010357, // FreqL[b8]
            0.014695, // FreqL[b9]
            0.077937, // FreqL[ba]
            0.006314, // FreqL[bb]
            0.004020, // FreqL[bc]
            0.007331, // FreqL[bd]
            0.007150, // FreqL[be]
            0.005341, // FreqL[bf]
            0.009195, // FreqL[c0]
            0.005350, // FreqL[c1]
            0.005698, // FreqL[c2]
            0.004472, // FreqL[c3]
            0.007242, // FreqL[c4]
            0.004039, // FreqL[c5]
            0.011154, // FreqL[c6]
            0.016184, // FreqL[c7]
            0.004741, // FreqL[c8]
            0.012814, // FreqL[c9]
            0.007679, // FreqL[ca]
            0.008045, // FreqL[cb]
            0.016631, // FreqL[cc]
            0.009451, // FreqL[cd]
            0.016487, // FreqL[ce]
            0.007287, // FreqL[cf]
            0.012688, // FreqL[d0]
            0.017421, // FreqL[d1]
            0.013205, // FreqL[d2]
            0.031480, // FreqL[d3]
            0.003404, // FreqL[d4]
            0.009149, // FreqL[d5]
            0.008921, // FreqL[d6]
            0.007514, // FreqL[d7]
            0.008683, // FreqL[d8]
            0.008203, // FreqL[d9]
            0.031403, // FreqL[da]
            0.011733, // FreqL[db]
            0.015617, // FreqL[dc]
            0.015306, // FreqL[dd]
            0.004004, // FreqL[de]
            0.010899, // FreqL[df]
            0.009961, // FreqL[e0]
            0.008388, // FreqL[e1]
            0.010920, // FreqL[e2]
            0.003925, // FreqL[e3]
            0.008585, // FreqL[e4]
            0.009108, // FreqL[e5]
            0.015546, // FreqL[e6]
            0.004659, // FreqL[e7]
            0.006934, // FreqL[e8]
            0.007023, // FreqL[e9]
            0.020252, // FreqL[ea]
            0.005387, // FreqL[eb]
            0.024704, // FreqL[ec]
            0.006963, // FreqL[ed]
            0.002625, // FreqL[ee]
            0.009512, // FreqL[ef]
            0.002971, // FreqL[f0]
            0.008233, // FreqL[f1]
            0.010000, // FreqL[f2]
            0.011973, // FreqL[f3]
            0.010553, // FreqL[f4]
            0.005945, // FreqL[f5]
            0.006349, // FreqL[f6]
            0.009401, // FreqL[f7]
            0.008577, // FreqL[f8]
            0.008186, // FreqL[f9]
            0.008159, // FreqL[fa]
            0.005033, // FreqL[fb]
            0.008714, // FreqL[fc]
            0.010614, // FreqL[fd]
            0.006554  // FreqL[fe]
        ];

        Big5Statistics.m_SecondByteStdDev = 0.009909; // Trail Byte StdDev
        Big5Statistics.m_SecondByteMean = 0.010638; // Trail Byte Mean
        Big5Statistics.m_SecondByteWeight = 0.324739;  // Trial Byte Weight
    }
    
}