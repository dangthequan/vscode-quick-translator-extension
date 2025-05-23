import Verifier from "./Verifier";

export default class SJISVerifier extends Verifier {
    private static m_cclass: number[] = new Array(256/8);
    private static m_states: number[] = new Array(3);
    private static m_stFactor: number = 6;
    private static m_charset: string = "Shift_JIS";

    public override cclass(): number[] { return SJISVerifier.m_cclass; }
    public override states(): number[] { return SJISVerifier.m_states; }
    public override stFactor(): number { return SJISVerifier.m_stFactor; }
    public override charset(): string { return SJISVerifier.m_charset; }
    public override isUCS2(): boolean { return false; }

    constructor() {
        super();

        const eError = Verifier.eError;
        const eItsMe = Verifier.eItsMe;
        const eStart = Verifier.eStart;


        SJISVerifier.m_cclass[0] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (0))) )))))) ;
        SJISVerifier.m_cclass[1] = ((((  ((((  (((( 0) << 4) | (0)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[2] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[3] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((0) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[4] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[5] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[6] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[7] = ((((  ((((  (((( 1) << 4) | (1)))  ) << 8) | (((((1) << 4) | ( 1))) ))) ) << 16) | (  ((((  ((((1) << 4) | (1))) ) << 8) | (   ((((1) << 4) | (1))) )))))) ;
        SJISVerifier.m_cclass[8] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[9] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[10] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[11] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[12] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[13] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[14] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[15] = ((((  ((((  (((( 1) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[16] = ((((  ((((  (((( 3) << 4) | (3)))  ) << 8) | (((((3) << 4) | ( 3))) ))) ) << 16) | (  ((((  ((((3) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[17] = ((((  ((((  (((( 3) << 4) | (3)))  ) << 8) | (((((3) << 4) | ( 3))) ))) ) << 16) | (  ((((  ((((3) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[18] = ((((  ((((  (((( 3) << 4) | (3)))  ) << 8) | (((((3) << 4) | ( 3))) ))) ) << 16) | (  ((((  ((((3) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[19] = ((((  ((((  (((( 3) << 4) | (3)))  ) << 8) | (((((3) << 4) | ( 3))) ))) ) << 16) | (  ((((  ((((3) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[20] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (4))) )))))) ;
        SJISVerifier.m_cclass[21] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[22] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[23] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[24] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[25] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[26] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[27] = ((((  ((((  (((( 2) << 4) | (2)))  ) << 8) | (((((2) << 4) | ( 2))) ))) ) << 16) | (  ((((  ((((2) << 4) | (2))) ) << 8) | (   ((((2) << 4) | (2))) )))))) ;
        SJISVerifier.m_cclass[28] = ((((  ((((  (((( 3) << 4) | (3)))  ) << 8) | (((((3) << 4) | ( 3))) ))) ) << 16) | (  ((((  ((((3) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[29] = ((((  ((((  (((( 4) << 4) | (4)))  ) << 8) | (((((4) << 4) | ( 5))) ))) ) << 16) | (  ((((  ((((5) << 4) | (3))) ) << 8) | (   ((((3) << 4) | (3))) )))))) ;
        SJISVerifier.m_cclass[30] = ((((  ((((  (((( 4) << 4) | (4)))  ) << 8) | (((((4) << 4) | ( 4))) ))) ) << 16) | (  ((((  ((((4) << 4) | (4))) ) << 8) | (   ((((4) << 4) | (4))) )))))) ;
        SJISVerifier.m_cclass[31] = ((((  ((((  (((( 0) << 4) | (0)))  ) << 8) | (((((0) << 4) | ( 4))) ))) ) << 16) | (  ((((  ((((4) << 4) | (4))) ) << 8) | (   ((((4) << 4) | (4))) )))))) ;
       
    
        SJISVerifier.m_states[0] = ((((  ((((  (((( eError) << 4) | (eError)))  ) << 8) | (((((eError) << 4) | ( eError))) ))) ) << 16) | (  ((((  ((((     3) << 4) | (eStart))) ) << 8) | (   ((((eStart) << 4) | (eError))) )))))) ;
        SJISVerifier.m_states[1] = ((((  ((((  (((( eItsMe) << 4) | (eItsMe)))  ) << 8) | (((((eItsMe) << 4) | ( eItsMe))) ))) ) << 16) | (  ((((  ((((eError) << 4) | (eError))) ) << 8) | (   ((((eError) << 4) | (eError))) )))))) ;
        SJISVerifier.m_states[2] = ((((  ((((  (((( eStart) << 4) | (eStart)))  ) << 8) | (((((eStart) << 4) | ( eStart))) ))) ) << 16) | (  ((((  ((((eError) << 4) | (eError))) ) << 8) | (   ((((eItsMe) << 4) | (eItsMe))) )))))) ;
       
       
    }
}