export default abstract class Verifier {
   public static readonly eStart: number = 0;
   public static readonly eError: number = 1;
   public static readonly eItsMe: number = 2;
   public static readonly eidxSft4bits: number = 3;
   public static readonly eSftMsk4bits: number = 7;
   public static readonly eBitSft4bits: number = 2;
   public static readonly eUnitMsk4bits: number = 0x0000000F;

   public constructor() {}

   public abstract charset(): string;
   public abstract stFactor(): number;
   public abstract cclass(): number[];
   public abstract states(): number[];
   public abstract isUCS2(): boolean;

   public static getNextState(v: Verifier, b: number, s: number): number {
       return (0xFF & (
           ((v.states()[(
               ((s * v.stFactor() + (((v.cclass()[((b & 0xFF) >> Verifier.eidxSft4bits)]) 
               >> ((b & Verifier.eSftMsk4bits) << Verifier.eBitSft4bits)) 
               & Verifier.eUnitMsk4bits)) & 0xFF)
           >> Verifier.eidxSft4bits)]) >> (((
               (s * v.stFactor() + (((v.cclass()[((b & 0xFF) >> Verifier.eidxSft4bits)]) 
               >> ((b & Verifier.eSftMsk4bits) << Verifier.eBitSft4bits)) 
               & Verifier.eUnitMsk4bits)) & 0xFF) 
           & Verifier.eSftMsk4bits) << Verifier.eBitSft4bits)) & Verifier.eUnitMsk4bits)
       );
   }
}

