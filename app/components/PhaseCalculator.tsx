"use client";

import { useState, useEffect } from "react";
import {
  calculatePhase1,
  calculatePhase2,
  calculatePhase3,
} from "../calculations";

interface PhaseCalculatorProps {
  title: string;
  phaseNumber: 1 | 2 | 3;
  defaultFrequency?: number;
  defaultWeeks?: number;
  onSessionsChange?: (sessions: number) => void;
  onInputsChange?: (inputs: {
    frequencyPerWeek: number;
    weeksInCarePlan: number;
  }) => void;
}

export default function PhaseCalculator({
  title,
  phaseNumber,
  defaultFrequency,
  defaultWeeks,
  onSessionsChange,
  onInputsChange,
}: PhaseCalculatorProps) {
  const [frequencyPerWeek, setFrequencyPerWeek] = useState(
    defaultFrequency || ""
  );
  const [weeksInCarePlan, setWeeksInCarePlan] = useState(defaultWeeks || "");

  // Calculate derived values using the calculation functions
  const frequency = Number(frequencyPerWeek) || 0;
  const weeks = Number(weeksInCarePlan) || 0;

  const results =
    phaseNumber === 1
      ? calculatePhase1({
          frequencyPerWeek: frequency,
          weeksInCarePlan: weeks,
        })
      : phaseNumber === 2
      ? calculatePhase2({
          frequencyPerWeek: frequency,
          weeksInCarePlan: weeks,
        })
      : calculatePhase3({
          frequencyPerWeek: frequency,
          weeksInCarePlan: weeks,
        });

  // Call onSessionsChange when sessions value changes
  useEffect(() => {
    if (onSessionsChange) {
      onSessionsChange(results.sessionsNeeded);
    }
  }, [results.sessionsNeeded, onSessionsChange]);

  // Call onInputsChange when input values change
  useEffect(() => {
    if (onInputsChange) {
      onInputsChange({
        frequencyPerWeek: frequency,
        weeksInCarePlan: weeks,
      });
    }
  }, [frequency, weeks, onInputsChange]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="p-3">
        <div className="space-y-2">
          {/* Input Fields - Yellow Background */}
          <div className="space-y-2">
            <div className="bg-white p-2.5 rounded-lg border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Frequency per week
              </label>
              <select
                value={frequencyPerWeek}
                onChange={(e) => setFrequencyPerWeek(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">Select frequency</option>
                <option value={1}>1 session per week</option>
                <option value={2}>2 sessions per week</option>
                <option value={3}>3 sessions per week</option>
                <option value={4}>4 sessions per week</option>
                <option value={5}>5 sessions per week</option>
                <option value={6}>6 sessions per week</option>
                <option value={7}>7 sessions per week</option>
              </select>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Weeks in care plan
              </label>
              <input
                type="number"
                value={weeksInCarePlan}
                onChange={(e) => setWeeksInCarePlan(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                min="1"
                max="52"
                placeholder="Enter weeks"
              />
            </div>
          </div>

          {/* Calculated Values */}
          <div className="space-y-1.5">
            <div className="bg-white p-2.5 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">
                  Phase {phaseNumber} Sessions Needed
                </span>
                <span className="text-base font-semibold text-gray-900">
                  {results.sessionsNeeded}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2.5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">À la Carte/mo</span>
                <span className="text-base font-semibold text-gray-900">
                  ${results.aLaCartePerMonth.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2.5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">
                  Signature Monthly
                </span>
                <span className="text-base font-semibold text-gray-900">
                  ${results.signatureMonthly.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2.5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Elite Monthly</span>
                <span className="text-base font-semibold text-gray-900">
                  ${results.eliteMonthly.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-2.5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Platinum Total</span>
                <span className="text-base font-semibold text-gray-900">
                  ${results.platinumTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
