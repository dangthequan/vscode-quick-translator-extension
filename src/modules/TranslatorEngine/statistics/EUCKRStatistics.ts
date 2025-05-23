import EUCStatistics from "./EUCStatistics";

export default class EUCKRStatistics extends EUCStatistics {
    static m_FirstByteFreq: number[];
    static m_FirstByteStdDev: number;
    static m_FirstByteMean: number;
    static m_FirstByteWeight: number;
    static m_SecondByteFreq: number[];
    static m_SecondByteStdDev: number;
    static m_SecondByteMean: number;
    static m_SecondByteWeight: number;

    public firstByteFreq(): number[] {
        return EUCKRStatistics.m_FirstByteFreq;
    }
    public firstByteStdDev(): number {
        return EUCKRStatistics.m_FirstByteStdDev;
    }
    public firstByteMean(): number {
        return EUCKRStatistics.m_FirstByteMean;
    }
    public firstByteWeight(): number {
        return EUCKRStatistics.m_FirstByteWeight;
    }
    public secondByteFreq(): number[] {
        return EUCKRStatistics.m_SecondByteFreq;
    }
    public secondByteStdDev(): number {
        return EUCKRStatistics.m_SecondByteStdDev;
    }
    public secondByteMean(): number {
        return EUCKRStatistics.m_SecondByteMean;
    }
    public secondByteWeight(): number {
        return EUCKRStatistics.m_SecondByteWeight;
    }
    
    constructor() {
        super()

        EUCKRStatistics.m_FirstByteFreq = [
            0.000000, // FreqH[a1]
            0.000000, // FreqH[a2]
            0.000000, // FreqH[a3]
            0.000000, // FreqH[a4]
            0.000000, // FreqH[a5]
            0.000000, // FreqH[a6]
            0.000000, // FreqH[a7]
            0.000412, // FreqH[a8]
            0.000000, // FreqH[a9]
            0.000000, // FreqH[aa]
            0.000000, // FreqH[ab]
            0.000000, // FreqH[ac]
            0.000000, // FreqH[ad]
            0.000000, // FreqH[ae]
            0.000000, // FreqH[af]
            0.057502, // FreqH[b0]
            0.033182, // FreqH[b1]
            0.002267, // FreqH[b2]
            0.016076, // FreqH[b3]
            0.014633, // FreqH[b4]
            0.032976, // FreqH[b5]
            0.004122, // FreqH[b6]
            0.011336, // FreqH[b7]
            0.058533, // FreqH[b8]
            0.024526, // FreqH[b9]
            0.025969, // FreqH[ba]
            0.054411, // FreqH[bb]
            0.019580, // FreqH[bc]
            0.063273, // FreqH[bd]
            0.113974, // FreqH[be]
            0.029885, // FreqH[bf]
            0.150041, // FreqH[c0]
            0.059151, // FreqH[c1]
            0.002679, // FreqH[c2]
            0.009893, // FreqH[c3]
            0.014839, // FreqH[c4]
            0.026381, // FreqH[c5]
            0.015045, // FreqH[c6]
            0.069456, // FreqH[c7]
            0.089860, // FreqH[c8]
            0.000000, // FreqH[c9]
            0.000000, // FreqH[ca]
            0.000000, // FreqH[cb]
            0.000000, // FreqH[cc]
            0.000000, // FreqH[cd]
            0.000000, // FreqH[ce]
            0.000000, // FreqH[cf]
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
            0.000000, // FreqH[fd]
            0.000000  // FreqH[fe]
        ];
                
        EUCKRStatistics.m_FirstByteStdDev = 0.025593; // Lead Byte StdDev
        EUCKRStatistics.m_FirstByteMean = 0.010638; // Lead Byte Mean
        EUCKRStatistics.m_FirstByteWeight = 0.647437; // Lead Byte Weight

        EUCKRStatistics.m_SecondByteFreq = [
            0.016694, // FreqL[a1]
            0.000000, // FreqL[a2]
            0.012778, // FreqL[a3]
            0.030091, // FreqL[a4]
            0.002679, // FreqL[a5]
            0.006595, // FreqL[a6]
            0.001855, // FreqL[a7]
            0.000824, // FreqL[a8]
            0.005977, // FreqL[a9]
            0.004740, // FreqL[aa]
            0.003092, // FreqL[ab]
            0.000824, // FreqL[ac]
            0.019580, // FreqL[ad]
            0.037304, // FreqL[ae]
            0.008244, // FreqL[af]
            0.014633, // FreqL[b0]
            0.001031, // FreqL[b1]
            0.000000, // FreqL[b2]
            0.003298, // FreqL[b3]
            0.002061, // FreqL[b4]
            0.006183, // FreqL[b5]
            0.005977, // FreqL[b6]
            0.000824, // FreqL[b7]
            0.021847, // FreqL[b8]
            0.014839, // FreqL[b9]
            0.052968, // FreqL[ba]
            0.017312, // FreqL[bb]
            0.007626, // FreqL[bc]
            0.000412, // FreqL[bd]
            0.000824, // FreqL[be]
            0.011129, // FreqL[bf]
            0.000000, // FreqL[c0]
            0.000412, // FreqL[c1]
            0.001649, // FreqL[c2]
            0.005977, // FreqL[c3]
            0.065746, // FreqL[c4]
            0.020198, // FreqL[c5]
            0.021434, // FreqL[c6]
            0.014633, // FreqL[c7]
            0.004122, // FreqL[c8]
            0.001649, // FreqL[c9]
            0.000824, // FreqL[ca]
            0.000824, // FreqL[cb]
            0.051937, // FreqL[cc]
            0.019580, // FreqL[cd]
            0.023289, // FreqL[ce]
            0.026381, // FreqL[cf]
            0.040396, // FreqL[d0]
            0.009068, // FreqL[d1]
            0.001443, // FreqL[d2]
            0.003710, // FreqL[d3]
            0.007420, // FreqL[d4]
            0.001443, // FreqL[d5]
            0.013190, // FreqL[d6]
            0.002885, // FreqL[d7]
            0.000412, // FreqL[d8]
            0.003298, // FreqL[d9]
            0.025969, // FreqL[da]
            0.000412, // FreqL[db]
            0.000412, // FreqL[dc]
            0.006183, // FreqL[dd]
            0.003298, // FreqL[de]
            0.066983, // FreqL[df]
            0.002679, // FreqL[e0]
            0.002267, // FreqL[e1]
            0.011129, // FreqL[e2]
            0.000412, // FreqL[e3]
            0.010099, // FreqL[e4]
            0.015251, // FreqL[e5]
            0.007626, // FreqL[e6]
            0.043899, // FreqL[e7]
            0.003710, // FreqL[e8]
            0.002679, // FreqL[e9]
            0.001443, // FreqL[ea]
            0.010923, // FreqL[eb]
            0.002885, // FreqL[ec]
            0.009068, // FreqL[ed]
            0.019992, // FreqL[ee]
            0.000412, // FreqL[ef]
            0.008450, // FreqL[f0]
            0.005153, // FreqL[f1]
            0.000000, // FreqL[f2]
            0.010099, // FreqL[f3]
            0.000000, // FreqL[f4]
            0.001649, // FreqL[f5]
            0.012160, // FreqL[f6]
            0.011542, // FreqL[f7]
            0.006595, // FreqL[f8]
            0.001855, // FreqL[f9]
            0.010923, // FreqL[fa]
            0.000412, // FreqL[fb]
            0.023702, // FreqL[fc]
            0.003710, // FreqL[fd]
            0.001855  // FreqL[fe]
        ];

        EUCKRStatistics.m_SecondByteStdDev = 0.013937; // Trail Byte StdDev
        EUCKRStatistics.m_SecondByteMean = 0.010638; // Trail Byte Mean
        EUCKRStatistics.m_SecondByteWeight = 0.352563; // Trial Byte Weight
    }
    
}