"use client";

import { useState } from "react";

export default function Home() {
  const [frequencyPerWeek, setFrequencyPerWeek] = useState(1);
  const [weeksInCarePlan, setWeeksInCarePlan] = useState(12);

  // Calculate derived values
  const phase1SessionsNeeded = frequencyPerWeek * weeksInCarePlan;
  const aLaCartePerMonth = (phase1SessionsNeeded * 250) / (weeksInCarePlan / 4);
  const signatureMonthly = Math.max(
    0,
    (phase1SessionsNeeded / (weeksInCarePlan / 4) - 1) * 150
  );
  const eliteMonthly = Math.max(
    0,
    (phase1SessionsNeeded / (weeksInCarePlan / 4) - 5) * 150
  );
  const platinumTotal = phase1SessionsNeeded * 3500; // Assuming $3500 per session for Platinum

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Club Five Health ROI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your return on investment for health services
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-4">
            <h2 className="text-2xl font-bold">Phase 1: Relief</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {/* Input Fields - Yellow Background */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Frequency per week
                  </label>
                  <input
                    type="number"
                    value={frequencyPerWeek}
                    onChange={(e) =>
                      setFrequencyPerWeek(Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Weeks in care plan
                  </label>
                  <input
                    type="number"
                    value={weeksInCarePlan}
                    onChange={(e) => setWeeksInCarePlan(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              {/* Spacer */}
              <div className="h-4"></div>

              {/* Calculated Values */}
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Phase 1 Sessions Needed
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {phase1SessionsNeeded}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      À la Carte/mo
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${aLaCartePerMonth.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Signature Monthly
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${signatureMonthly.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Elite Monthly
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${eliteMonthly.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Platinum Total
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${platinumTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
