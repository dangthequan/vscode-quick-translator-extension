export default abstract class EUCStatistics {
    public abstract firstByteFreq(): number[];
    public abstract firstByteStdDev(): number;
    public abstract firstByteMean(): number;
    public abstract firstByteWeight(): number;
  
    public abstract secondByteFreq(): number[];
    public abstract secondByteStdDev(): number;
    public abstract secondByteMean(): number;
    public abstract secondByteWeight(): number;
  
    constructor() { }
}