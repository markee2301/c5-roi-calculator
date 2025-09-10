import {
  calculatePhase1,
  calculatePhase2,
  calculatePhase3,
} from "./calculations";

export interface TableCalculationsInputs {
  phaseSessions: {
    phase1: number;
    phase2: number;
    phase3: number;
  };
  phaseInputs: {
    phase1: { frequencyPerWeek: number; weeksInCarePlan: number };
    phase2: { frequencyPerWeek: number; weeksInCarePlan: number };
    phase3: { frequencyPerWeek: number; weeksInCarePlan: number };
  };
}

export interface TableCalculationsOutputs {
  totalSessions: number;
  aLaCarteTotalCarePlan: number;
  phase1Results: any;
  phase2Results: any;
  phase3Results: any;
}

export function calculateTableValues(
  inputs: TableCalculationsInputs
): TableCalculationsOutputs {
  const { phaseSessions, phaseInputs } = inputs;

  const totalSessions =
    phaseSessions.phase1 + phaseSessions.phase2 + phaseSessions.phase3;
  const aLaCarteTotalCarePlan = totalSessions * 250;

  // Calculate phase-specific values for the table
  const phase1Results = calculatePhase1(phaseInputs.phase1);
  const phase2Results = calculatePhase2(phaseInputs.phase2);
  const phase3Results = calculatePhase3(phaseInputs.phase3);

  return {
    totalSessions,
    aLaCarteTotalCarePlan,
    phase1Results,
    phase2Results,
    phase3Results,
  };
}

// A La Carte calculations
export function calculateALaCarteAvgMonthly(
  aLaCarteTotalCarePlan: number,
  phaseInputs: any
) {
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0;

  return (aLaCarteTotalCarePlan - 0) / totalWeeks;
}

export function calculateALaCarteAvgSession(
  aLaCarteTotalCarePlan: number,
  totalSessions: number
) {
  if (totalSessions === 0 || aLaCarteTotalCarePlan === 0) return 0;
  return aLaCarteTotalCarePlan / totalSessions;
}

// Signature calculations
export function calculateSignatureTotalCarePlan(
  phase1Results: any,
  phase2Results: any,
  phase3Results: any,
  phaseInputs: any
) {
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0; // Return 0 when no inputs

  return (
    2500 +
    phase1Results.signatureMonthly  * phaseInputs.phase1.weeksInCarePlan +
    phase2Results.signatureMonthly  * phaseInputs.phase2.weeksInCarePlan +
    phase3Results.signatureMonthly  * phaseInputs.phase3.weeksInCarePlan
  );
}

export function calculateSignatureAvgMonthly(
  signatureTotalCarePlan: number,
  phaseInputs: any
) {
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0;

  return (signatureTotalCarePlan - 2500) / totalWeeks;
}

export function calculateSignatureAvgSession(
  signatureTotalCarePlan: number,
  totalSessions: number
) {
  if (totalSessions === 0 || signatureTotalCarePlan === 0) return 0;
  return signatureTotalCarePlan / totalSessions;
}

// Elite calculations
export function calculateEliteTotalCarePlan(
  phase1Results: any,
  phase2Results: any,
  phase3Results: any,
  phaseInputs: any
) {
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0; // Return 0 when no inputs

  return (
    8400 +
    phase1Results.eliteMonthly  * phaseInputs.phase1.weeksInCarePlan +
    phase2Results.eliteMonthly  * phaseInputs.phase2.weeksInCarePlan +
    phase3Results.eliteMonthly  * phaseInputs.phase3.weeksInCarePlan
  );
}

export function calculateEliteAvgMonthly(
  eliteTotalCarePlan: number,
  phaseInputs: any
) {
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0;

  return (eliteTotalCarePlan - 8400) / totalWeeks;
}

export function calculateEliteAvgSession(
  eliteTotalCarePlan: number,
  totalSessions: number
) {
  if (totalSessions === 0 || eliteTotalCarePlan === 0) return 0;
  return eliteTotalCarePlan / totalSessions;
}

// Platinum calculations
export function calculatePlatinumAvgMonthly(phaseInputs: any) {
  const platinumTotalCarePlan = 42000;
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  if (totalWeeks === 0) return 0;

  return (platinumTotalCarePlan - 42000 ) / totalWeeks;
}

export function calculatePlatinumAvgSession(totalSessions: number) {
  const platinumTotalCarePlan = 42000;
  if (totalSessions === 0) return 0;
  return platinumTotalCarePlan / totalSessions;
}
