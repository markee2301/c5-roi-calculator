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
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#20B2AA]/20 overflow-hidden shadow-2xl">
      <div className="bg-[#3A4D3C] text-white px-6 py-4 border-b border-[#20B2AA]/20">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {/* Input Fields */}
          <div className="space-y-4">
            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20">
              <label className="block text-sm font-bold text-white mb-2">
                Frequency per month
              </label>
              <select
                value={frequencyPerWeek}
                onChange={(e) => setFrequencyPerWeek(e.target.value)}
                className="w-full px-4 py-3 border border-[#20B2AA]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent text-white bg-[#1a1a1a] transition-all"
              >
                <option value="">Select frequency</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} time{i > 0 ? "s" : ""} per month
                  </option>
                ))}
                {/* <option value={0.25}>Once a month</option>
                <option value={0.5}>Biweekly</option>
                <option value={1}>1 session per week</option>
                <option value={2}>2 sessions per week</option>
                <option value={3}>3 sessions per week</option>
                <option value={4}>4 sessions per week</option>
                <option value={5}>5 sessions per week</option>
                <option value={6}>6 sessions per week</option>
                <option value={7}>7 sessions per week</option> */}
              </select>
            </div>

            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20">
              <label className="block text-sm font-bold text-white mb-2">
                Months in care plan
              </label>
              <input
                type="number"
                value={weeksInCarePlan}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow positive integers (no decimals, no negatives, no non-numeric)
                  if (
                    value === "" ||
                    (/^\d+$/.test(value) && Number(value) > 0)
                  ) {
                    setWeeksInCarePlan(value);
                  }
                }}
                onKeyDown={(e) => {
                  // Prevent decimal point, minus sign, and other non-numeric characters
                  if (
                    e.key === "." ||
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "+"
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-full px-4 py-3 border border-[#20B2AA]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent text-white bg-[#1a1a1a] transition-all"
                min="1"
                max="52"
                step="1"
                placeholder="Enter months"
              />
            </div>
          </div>

          {/* Calculated Values */}
          <div className="space-y-3">
            <div className="bg-[#262626] p-4 rounded-xl border border-blue-500/20">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">
                  Phase {phaseNumber} Sessions Needed
                </span>
                <span className="text-lg font-semibold text-blue-500">
                  {results.sessionsNeeded}
                </span>
              </div>
            </div>

            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20 hidden">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-300">À la Carte/mo</span>
                <span className="text-lg font-semibold text-green-400">
                  ${results.aLaCartePerMonth.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20 hidden">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-300">
                  Signature Monthly
                </span>
                <span className="text-lg font-semibold text-green-400">
                  ${results.signatureMonthly.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20 hidden">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-300">Elite Monthly</span>
                <span className="text-lg font-semibold text-green-400">
                  ${results.eliteMonthly.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-[#262626] p-4 rounded-xl border border-[#20B2AA]/20 hidden">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-300">Platinum Total</span>
                <span className="text-lg font-semibold text-green-400">
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
