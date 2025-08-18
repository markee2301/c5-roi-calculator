"use client";

import { useState, useCallback } from "react";
import PhaseCalculator from "./components/PhaseCalculator";
import {
  calculateTableValues,
  calculateALaCarteAvgMonthly,
  calculateALaCarteAvgSession,
  calculateSignatureTotalCarePlan,
  calculateSignatureAvgMonthly,
  calculateSignatureAvgSession,
  calculateEliteTotalCarePlan,
  calculateEliteAvgMonthly,
  calculateEliteAvgSession,
  calculatePlatinumAvgMonthly,
  calculatePlatinumAvgSession,
} from "./tableCalculations";

export default function Home() {
  const [phaseSessions, setPhaseSessions] = useState({
    phase1: 0,
    phase2: 0,
    phase3: 0,
  });

  const [phaseInputs, setPhaseInputs] = useState({
    phase1: { frequencyPerWeek: 0, weeksInCarePlan: 0 },
    phase2: { frequencyPerWeek: 0, weeksInCarePlan: 0 },
    phase3: { frequencyPerWeek: 0, weeksInCarePlan: 0 },
  });

  // Memoize the callback functions to prevent infinite re-renders
  const handlePhase1SessionsChange = useCallback((sessions: number) => {
    setPhaseSessions((prev) => ({ ...prev, phase1: sessions }));
  }, []);

  const handlePhase2SessionsChange = useCallback((sessions: number) => {
    setPhaseSessions((prev) => ({ ...prev, phase2: sessions }));
  }, []);

  const handlePhase3SessionsChange = useCallback((sessions: number) => {
    setPhaseSessions((prev) => ({ ...prev, phase3: sessions }));
  }, []);

  const handlePhase1InputsChange = useCallback(
    (inputs: { frequencyPerWeek: number; weeksInCarePlan: number }) => {
      setPhaseInputs((prev) => ({ ...prev, phase1: inputs }));
    },
    []
  );

  const handlePhase2InputsChange = useCallback(
    (inputs: { frequencyPerWeek: number; weeksInCarePlan: number }) => {
      setPhaseInputs((prev) => ({ ...prev, phase2: inputs }));
    },
    []
  );

  const handlePhase3InputsChange = useCallback(
    (inputs: { frequencyPerWeek: number; weeksInCarePlan: number }) => {
      setPhaseInputs((prev) => ({ ...prev, phase3: inputs }));
    },
    []
  );

  // Calculate all table values
  const tableValues = calculateTableValues({ phaseSessions, phaseInputs });
  const {
    totalSessions,
    aLaCarteTotalCarePlan,
    phase1Results,
    phase2Results,
    phase3Results,
  } = tableValues;

  // Calculate total weeks for highlighting logic
  const totalWeeks =
    phaseInputs.phase1.weeksInCarePlan +
    phaseInputs.phase2.weeksInCarePlan +
    phaseInputs.phase3.weeksInCarePlan;

  // Calculate total care plan values for each membership
  const signatureTotalCarePlan = calculateSignatureTotalCarePlan(
    phase1Results,
    phase2Results,
    phase3Results,
    phaseInputs
  );
  const eliteTotalCarePlan = calculateEliteTotalCarePlan(
    phase1Results,
    phase2Results,
    phase3Results,
    phaseInputs
  );
  const platinumTotalCarePlan = 42000;

  // Find the lowest total care plan value
  const carePlanValues = [
    { type: "aLaCarte", value: aLaCarteTotalCarePlan },
    { type: "signature", value: signatureTotalCarePlan },
    { type: "elite", value: eliteTotalCarePlan },
    { type: "platinum", value: platinumTotalCarePlan },
  ].filter((item) => item.value > 0); // Only consider memberships with positive values

  const lowestCarePlan =
    carePlanValues.length > 0
      ? carePlanValues.reduce((min, current) =>
          current.value < min.value ? current : min
        )
      : null;

  // Determine which membership to highlight based on lowest total care plan
  const shouldHighlightALaCarte = lowestCarePlan?.type === "aLaCarte";
  const shouldHighlightSignature = lowestCarePlan?.type === "signature";
  const shouldHighlightElite = lowestCarePlan?.type === "elite";
  const shouldHighlightPlatinum = lowestCarePlan?.type === "platinum";

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Club Five Health
            </h1>
            <h2 className="text-3xl font-semibold text-[#ADEBB3] mb-2">
              ROI Calculator
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Analyze the optimal treatment protocol and membership recommendation
            for your patients. Create personalized care plans based on
            individual patient needs and optimize their health journey across
            our three-phase system.
          </p>
        </div>

        {/* Note to use */}
        <div className="mt-8 mb-8 text-center">
          <p className="text-sm text-orange-300 font-medium">
            <strong>NOTE TO USE:</strong> Do not go under 4 weeks for each phase
            - ideal total to 48 weeks
          </p>
        </div>

        {/* All Phases in One Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Phase 1 Calculator */}
          <PhaseCalculator
            title="Phase 1: Relief"
            phaseNumber={1}
            onSessionsChange={handlePhase1SessionsChange}
            onInputsChange={handlePhase1InputsChange}
          />

          {/* Phase 2 Calculator */}
          <PhaseCalculator
            title="Phase 2: Rebuild"
            phaseNumber={2}
            onSessionsChange={handlePhase2SessionsChange}
            onInputsChange={handlePhase2InputsChange}
          />

          {/* Phase 3 Calculator */}
          <PhaseCalculator
            title="Phase 3: Longevity"
            phaseNumber={3}
            onSessionsChange={handlePhase3SessionsChange}
            onInputsChange={handlePhase3InputsChange}
          />
        </div>

        {/* Total Sessions Display */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-blue-500/20 p-8 mb-12 shadow-2xl">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">
              Total Sessions Needed:
            </span>
            <span className="text-4xl font-bold text-blue-500">
              {totalSessions}
            </span>
          </div>
        </div>

        {/* Recommended Membership Table */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#20B2AA]/20 overflow-hidden shadow-2xl">
          <div className="bg-[#3A4D3C] text-white px-8 py-4 border-b border-[#20B2AA]/20">
            <h2 className="text-3xl font-bold">Recommended Membership</h2>
          </div>
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#262626]">
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white">
                      Membership Type
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white">
                      Downpayment
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white">
                      Average Session
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white hidden">
                      Phase 1/mo
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white hidden">
                      Phase 2/mo
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white hidden">
                      Phase 3/mo
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white">
                      Average Monthly
                    </th>
                    <th className="border border-[#20B2AA]/20 px-6 py-4 text-left font-bold text-white">
                      Total Care Plan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`transition-colors ${
                      shouldHighlightALaCarte
                        ? "bg-[#ADEBB3]/10 border-l-4 border-l-[#ADEBB3] hover:bg-[#ADEBB3]/20"
                        : "hover:bg-[#262626]/50"
                    }`}
                  >
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      A La Carte
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $0.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateALaCarteAvgSession(
                          aLaCarteTotalCarePlan,
                          totalSessions
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase1Results.aLaCartePerMonth.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase2Results.aLaCartePerMonth.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase3Results.aLaCartePerMonth.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateALaCarteAvgMonthly(
                          aLaCarteTotalCarePlan,
                          phaseInputs
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(aLaCarteTotalCarePlan.toFixed(2)).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                  </tr>
                  <tr
                    className={`transition-colors ${
                      shouldHighlightSignature
                        ? "bg-[#ADEBB3]/10 border-l-4 border-l-[#ADEBB3] hover:bg-[#ADEBB3]/20"
                        : "hover:bg-[#262626]/50"
                    }`}
                  >
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-white font-medium">
                      Signature
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $2,500.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateSignatureAvgSession(
                          calculateSignatureTotalCarePlan(
                            phase1Results,
                            phase2Results,
                            phase3Results,
                            phaseInputs
                          ),
                          totalSessions
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase1Results.signatureMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase2Results.signatureMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase3Results.signatureMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateSignatureAvgMonthly(
                          calculateSignatureTotalCarePlan(
                            phase1Results,
                            phase2Results,
                            phase3Results,
                            phaseInputs
                          ),
                          phaseInputs
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateSignatureTotalCarePlan(
                          phase1Results,
                          phase2Results,
                          phase3Results,
                          phaseInputs
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr
                    className={`transition-colors ${
                      shouldHighlightElite
                        ? "bg-[#ADEBB3]/10 border-l-4 border-l-[#ADEBB3] hover:bg-[#ADEBB3]/20"
                        : "hover:bg-[#262626]/50"
                    }`}
                  >
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-white font-medium">
                      Elite
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $8,400.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateEliteAvgSession(
                          calculateEliteTotalCarePlan(
                            phase1Results,
                            phase2Results,
                            phase3Results,
                            phaseInputs
                          ),
                          totalSessions
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase1Results.eliteMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase2Results.eliteMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $
                      {Number(
                        phase3Results.eliteMonthly.toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateEliteAvgMonthly(
                          calculateEliteTotalCarePlan(
                            phase1Results,
                            phase2Results,
                            phase3Results,
                            phaseInputs
                          ),
                          phaseInputs
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculateEliteTotalCarePlan(
                          phase1Results,
                          phase2Results,
                          phase3Results,
                          phaseInputs
                        ).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr
                    className={`transition-colors ${
                      shouldHighlightPlatinum
                        ? "bg-[#ADEBB3]/10 border-l-4 border-l-[#ADEBB3] hover:bg-[#ADEBB3]/20"
                        : "hover:bg-[#262626]/50"
                    }`}
                  >
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      Platinum
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $42,000.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculatePlatinumAvgSession(totalSessions).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $0.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $0.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300 hidden">
                      $0.00
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $
                      {Number(
                        calculatePlatinumAvgMonthly(phaseInputs).toFixed(2)
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-[#20B2AA]/20 px-6 py-4 text-gray-300">
                      $42,000.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12">
          <div className="w-full h-px bg-gray-600 mb-8"></div>
          <p className="text-gray-400 text-sm leading-relaxed text-center max-w-4xl mx-auto">
            Disclaimer: Projections are for illustration purposes based on
            typical usage patterns and billing rates. Actual results will vary
            based on individual practice factors, patient volume, billing
            practices, and other variables. Past performance does not indicate
            future results. Consult with your financial advisor regarding tax
            implications.
          </p>
        </div>
      </div>
    </div>
  );
}
