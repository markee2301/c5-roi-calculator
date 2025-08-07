"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Determine which membership to highlight based on total weeks
  const shouldHighlightSignature = totalWeeks > 0 && totalWeeks < 60;
  const shouldHighlightElite = totalWeeks >= 60;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Club Five Health ROI Calculator
          </h1>
          <p className="text-gray-600">
            Analyze the optimal treatment protocol and membership recommendation
            for your patients.
          </p>
          <p className="text-gray-600">
            Create personalized care plans based on individual patient needs and
            optimize their health journey across our three-phase system.
          </p>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">
              <strong>NOTE TO USE:</strong> Do not go under 4 weeks for each
              phase - ideal total to 48 weeks
            </p>
          </div>
        </div>

        {/* All Phases in One Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              Total Sessions Needed
            </span>
            <span className="text-3xl font-bold text-blue-600">
              {totalSessions}
            </span>
          </div>
        </div>

        {/* Recommended Membership Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recommended Membership
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Membership Type
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Downpayment
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Average Session
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Phase 1/mo
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Phase 2/mo
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Phase 3/mo
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Average Monthly
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                    Total Care Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    A La Carte
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $0.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase1Results.aLaCartePerMonth.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase2Results.aLaCartePerMonth.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase3Results.aLaCartePerMonth.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  className={`hover:bg-gray-50 ${
                    shouldHighlightSignature
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">
                    Signature
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $2,500.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase1Results.signatureMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase2Results.signatureMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase3Results.signatureMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  className={`hover:bg-gray-50 ${
                    shouldHighlightElite
                      ? "bg-green-50 border-l-4 border-l-green-500"
                      : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">
                    Elite
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $8,400.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase1Results.eliteMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase2Results.eliteMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      phase3Results.eliteMonthly.toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
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
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    Platinum
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $42,000.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      calculatePlatinumAvgSession(totalSessions).toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $0.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $0.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $0.00
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $
                    {Number(
                      calculatePlatinumAvgMonthly(phaseInputs).toFixed(2)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">
                    $42,000.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Disclaimer:</strong> The results provided by the Club Five
            Care Plan Calculator are for illustrative purposes only and should
            not be interpreted as a finalized treatment plan. Actual session
            counts, modalities, and care recommendations may vary based on your
            specific needs, medical history, and the personalized guidance of
            your provider. All care plans at Club Five Health are tailored
            individually following a comprehensive evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
