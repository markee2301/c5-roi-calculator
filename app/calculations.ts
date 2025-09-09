export interface CalculatorInputs {
  frequencyPerWeek: number;
  weeksInCarePlan: number;
}

export interface CalculatorOutputs {
  sessionsNeeded: number;
  aLaCartePerMonth: number;
  signatureMonthly: number;
  eliteMonthly: number;
  platinumTotal: number;
}

export function calculatePhase1(inputs: CalculatorInputs): CalculatorOutputs {
  const { frequencyPerWeek: frequencyPerMonth, weeksInCarePlan } = inputs;

  const months = weeksInCarePlan;
  const sessionsNeeded = frequencyPerMonth * months;

  const aLaCartePerMonth = months > 0 ? (sessionsNeeded * 250) / months : 0;
  const signatureMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 1) * 150 : 0
  );
  const eliteMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 5) * 150 : 0
  );
  const platinumTotal = 42000; // Static value

  return {
    sessionsNeeded,
    aLaCartePerMonth,
    signatureMonthly,
    eliteMonthly,
    platinumTotal,
  };
}


export function calculatePhase2(inputs: CalculatorInputs): CalculatorOutputs {
  const { frequencyPerWeek: frequencyPerMonth, weeksInCarePlan } = inputs;

  const months = weeksInCarePlan;
  const sessionsNeeded = frequencyPerMonth * months;

  const aLaCartePerMonth = months > 0 ? (sessionsNeeded * 250) / months : 0;
  const signatureMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 1) * 150 : 0
  );
  const eliteMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 5) * 150 : 0
  );
  const platinumTotal = 42000; // Static value

  return {
    sessionsNeeded,
    aLaCartePerMonth,
    signatureMonthly,
    eliteMonthly,
    platinumTotal,
  };
}

export function calculatePhase3(inputs: CalculatorInputs): CalculatorOutputs {
  const { frequencyPerWeek: frequencyPerMonth, weeksInCarePlan } = inputs;

  const months = weeksInCarePlan;
  const sessionsNeeded = frequencyPerMonth * months;
  const aLaCartePerMonth = months > 0 ? (sessionsNeeded * 250) / months : 0;
  const signatureMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 1) * 150 : 0
  );
  const eliteMonthly = Math.max(
    0,
    months > 0 ? (sessionsNeeded / months - 5) * 150 : 0
  );
  const platinumTotal = 42000; // Static value

  return {
    sessionsNeeded,
    aLaCartePerMonth,
    signatureMonthly,
    eliteMonthly,
    platinumTotal,
  };
}
