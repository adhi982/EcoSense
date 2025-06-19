'use client'

import { useState, Fragment, useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import type { CalculatorInputs, CalculatorResults, ChartData } from '../types'

ChartJS.register(ArcElement, Tooltip, Legend)

// Define info content for each input
const INFO_CONTENT: { [key: string]: string } = {
  electricity: 'Monthly electricity usage in kilowatt-hours (kWh). This is a major source of carbon emissions from homes.',
  gas: 'Monthly natural gas usage in cubic meters. Used for heating, cooking, and hot water, contributing to emissions.',
  carMiles: 'Average monthly miles driven in a car. Vehicle emissions are a significant part of a personal carbon footprint.',
  publicTransport: 'Average monthly miles traveled using public transportation (bus, train, subway). This generally has lower emissions per person than driving.',
  diet: 'Your typical diet. Meat and dairy production tend to have higher carbon footprints than plant-based diets.',
  waste: 'Monthly weight of waste sent to landfill in kilograms. Reducing waste and recycling properly lowers emissions from decomposition.',
};

// Function to determine footprint status (based on data for households in India)
const getFootprintStatus = (total: number): { status: string, color: string } => {
  if (total < 3000) {
    return { status: 'Excellent', color: 'text-green-600' }; // Below 3,000
  } else if (total >= 3000 && total < 8000) {
    return { status: 'Good', color: 'text-yellow-600' }; // 3,000 – 8,000
  } else {
    return { status: 'High', color: 'text-red-600' }; // Above 8,000
  }
};

// Function to generate recommendations based on breakdown
const getRecommendations = (breakdown: CalculatorResults['breakdown']): string[] => {
  const recommendations: string[] = [];
  // Define thresholds for suggesting recommendations (These are examples and might need tuning based on real data)
  const thresholds = {
    electricity: 1500, // Example threshold (kg CO2e per year)
    gas: 1000, // Example threshold (kg CO2e per year)
    transport: 4000, // Example threshold (kg CO2e per year)
    diet: 1500, // Example threshold (kg CO2e per year)
    waste: 800, // Example threshold (kg CO2e per year)
  };

  if (breakdown.electricity > thresholds.electricity) {
    recommendations.push('Consider energy-efficient appliances and practices. Look into solar options if feasible.');
  }
  if (breakdown.gas > thresholds.gas) {
    recommendations.push('Optimize cooking gas usage and ensure efficient stoves. Explore electric alternatives.');
  }
  if (breakdown.transport > thresholds.transport) {
    recommendations.push('Prioritize public transport, walking, cycling, or consider electric two-wheelers/cars.');
  }
  if (breakdown.diet > thresholds.diet) {
    recommendations.push('Increase consumption of local, seasonal produce and reduce meat/dairy intake.');
  }
  if (breakdown.waste > thresholds.waste) {
    recommendations.push('Implement strict waste segregation, composting, and minimize single-use items.');
  }

  if (recommendations.length === 0 && getFootprintStatus(Object.values(breakdown).reduce((sum, value) => sum + value, 0)).status === 'Excellent') {
    recommendations.push('Excellent work! Your footprint is very low. Continue sustainable habits!');
  } else if (recommendations.length === 0) {
     recommendations.push('Consider the areas contributing most to your footprint based on the breakdown below for tailored actions.');
  }


  return recommendations;
};

export default function CarbonCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    electricity: 0,
    gas: 0,
    carMiles: 0,
    publicTransport: 0,
    diet: 'omnivore',
    waste: 0,
  })

  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [openInfoPopup, setOpenInfoPopup] = useState<string | null>(null); // State for open info popup for inputs
  const [openStatusInfo, setOpenStatusInfo] = useState(false); // State for status info popup

  // Refs for the popups to detect outside clicks
  const inputPopupRef = useRef<HTMLDivElement>(null);
  const statusPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close input popup if click is outside and popup is open
      if (openInfoPopup && inputPopupRef.current && !inputPopupRef.current.contains(event.target as Node)) {
        setOpenInfoPopup(null);
      }
      // Close status popup if click is outside and popup is open
      if (openStatusInfo && statusPopupRef.current && !statusPopupRef.current.contains(event.target as Node)) {
        setOpenStatusInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openInfoPopup, openStatusInfo]); // Re-run effect if popup states change

  const calculateFootprint = () => {
    // Calculation based on example factors (annualized)
    const breakdown = {
      electricity: inputs.electricity * 0.4 * 12, // kg CO2e per kWh per year
      gas: inputs.gas * 2.1 * 12, // kg CO2e per cubic meter per year
      transport: (inputs.carMiles * 0.4 * 12) + (inputs.publicTransport * 0.1 * 12), // kg CO2e per mile per year
      diet: inputs.diet === 'vegan' ? 1000 : inputs.diet === 'vegetarian' ? 1500 : 2500, // kg CO2e per year (These are example values)
      waste: inputs.waste * 2.5 * 12, // kg CO2e per kg of waste per year
    }

    const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

    setResults({
      total,
      breakdown,
    })
  }

  const chartData: ChartData | null = results ? {
    labels: Object.keys(results.breakdown).map(key => 
      key.charAt(0).toUpperCase() + key.slice(1) + ' (' + Math.round(results.breakdown[key as keyof CalculatorResults['breakdown']]) + ' kg CO₂e)'
    ),
    datasets: [
      {
        data: Object.values(results.breakdown),
        backgroundColor: [
          '#10B981', // Emerald 500
          '#059669', // Emerald 600
          '#065F46', // Emerald 900
          '#14B8A6', // Teal 500
          '#0891B2', // Cyan 600
          '#22C55E', // Green 600
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  } : null;

  // Handle input change for number fields, allowing empty string during typing
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof CalculatorInputs) => {
    const value = e.target.value;
    setInputs(prev => ({
      ...prev,
      [key]: value === '' ? 0 : Number(value),
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white bg-opacity-80 rounded-xl shadow-lg">
      {/* Adjust grid columns: Input takes 1/2, Results take 1/2 on medium+ screens */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs Card */}
        <div className="md:col-span-1 card p-6 border border-green-200">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">Your Inputs</h3>

          <div className="space-y-6">
            {/* Electricity Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="electricity"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Monthly Electricity Usage (kWh)
                </label>
                <button
                  onClick={() =>
                    setOpenInfoPopup(openInfoPopup === 'electricity' ? null : 'electricity')
                  }
                  className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold"
                  aria-label="Info about Monthly Electricity Usage"
                >
                  ⓘ
                </button>
              </div>
              {/* Info Popup */}
              {openInfoPopup === 'electricity' && (
                <div ref={inputPopupRef} className="absolute top-0 left-full ml-4 w-64 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700">
                  {INFO_CONTENT.electricity}
                </div>
              )}
              <input
                type="number"
                id="electricity"
                className="input-field w-full"
                value={inputs.electricity === 0 && results === null ? '' : inputs.electricity}
                onChange={(e) => handleNumberInputChange(e, 'electricity')}
                min="0"
                placeholder="0"
              />
            </div>

            {/* Gas Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="gas"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Monthly Gas Usage (cubic meters)
                </label>
                <button
                  onClick={() =>
                    setOpenInfoPopup(openInfoPopup === 'gas' ? null : 'gas')
                  }
                  className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold"
                  aria-label="Info about Monthly Gas Usage"
                >
                  ⓘ
                </button>
              </div>
              {/* Info Popup */}
              {openInfoPopup === 'gas' && (
                <div ref={inputPopupRef} className="absolute top-0 left-full ml-4 w-64 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700">
                  {INFO_CONTENT.gas}
                </div>
              )}
              <input
                type="number"
                id="gas"
                className="input-field w-full"
                value={inputs.gas === 0 && results === null ? '' : inputs.gas}
                onChange={(e) => handleNumberInputChange(e, 'gas')}
                min="0"
                placeholder="0"
              />
            </div>

            {/* Car Miles Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="carMiles"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Monthly Car Miles
                </label>
                <button
                  onClick={() =>
                    setOpenInfoPopup(openInfoPopup === 'carMiles' ? null : 'carMiles')
                  }
                  className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold"
                  aria-label="Info about Monthly Car Miles"
                >
                  ⓘ
                </button>
              </div>
              {/* Info Popup */}
              {openInfoPopup === 'carMiles' && (
                <div ref={inputPopupRef} className="absolute top-0 left-full ml-4 w-64 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700">
                  {INFO_CONTENT.carMiles}
                </div>
              )}
              <input
                type="number"
                id="carMiles"
                className="input-field w-full"
                value={inputs.carMiles === 0 && results === null ? '' : inputs.carMiles}
                onChange={(e) => handleNumberInputChange(e, 'carMiles')}
                min="0"
                placeholder="0"
              />
            </div>

            {/* Public Transport Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="publicTransport"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Monthly Public Transport Miles
                </label>
                <button
                  onClick={() =>
                    setOpenInfoPopup(openInfoPopup === 'publicTransport' ? null : 'publicTransport')
                  }
                  className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold"
                  aria-label="Info about Monthly Public Transport Miles"
                >
                  ⓘ
                </button>
              </div>
              {/* Info Popup */}
              {openInfoPopup === 'publicTransport' && (
                <div ref={inputPopupRef} className="absolute top-0 left-full ml-4 w-64 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700">
                  {INFO_CONTENT.publicTransport}
                </div>
              )}
              <input
                type="number"
                id="publicTransport"
                className="input-field w-full"
                value={inputs.publicTransport === 0 && results === null ? '' : inputs.publicTransport}
                onChange={(e) => handleNumberInputChange(e, 'publicTransport')}
                min="0"
                placeholder="0"
              />
            </div>

            {/* Diet Type Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="diet"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Diet Type
                </label>
                {/* No info popup for diet type as it's self-explanatory */}
              </div>
              <select
                id="diet"
                className="input-field w-full"
                value={inputs.diet}
                onChange={(e) =>
                  setInputs({ ...inputs, diet: e.target.value as CalculatorInputs['diet'] })
                }
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="omnivore">Omnivore</option>
              </select>
            </div>

            {/* Waste Input */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <label
                  htmlFor="waste"
                  className="block text-sm font-medium text-gray-700 mr-2"
                >
                  Monthly Waste (kg)
                </label>
                <button
                  onClick={() =>
                    setOpenInfoPopup(openInfoPopup === 'waste' ? null : 'waste')
                  }
                  className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold"
                  aria-label="Info about Monthly Waste"
                >
                  ⓘ
                </button>
              </div>
              {/* Info Popup */}
              {openInfoPopup === 'waste' && (
                <div ref={inputPopupRef} className="absolute top-0 left-full ml-4 w-64 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700">
                  {INFO_CONTENT.waste}
                </div>
              )}
              <input
                type="number"
                id="waste"
                className="input-field w-full"
                value={inputs.waste === 0 && results === null ? '' : inputs.waste}
                onChange={(e) => handleNumberInputChange(e, 'waste')}
                min="0"
                placeholder="0"
              />
            </div>

            <button
              className="btn-primary bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
              onClick={calculateFootprint}
            >
              Calculate Footprint
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="md:col-span-1 card p-6 border border-green-200 flex flex-col justify-center items-center text-center">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">Your Results</h3>

          {results ? (
            <div className="space-y-6 w-full animate-fade-in">
              <div className="relative">
                <p className="text-lg text-gray-700">Total Annual Carbon Footprint</p>
                <p
                  className={`text-5xl md:text-6xl font-bold mt-2 ${getFootprintStatus(results.total).color}`}
                >
                  {Math.round(results.total)} kg CO₂e
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-lg text-gray-700">
                    Current Status:{' '}
                    <span
                      className={`${getFootprintStatus(results.total).color} font-semibold`}
                    >
                      {getFootprintStatus(results.total).status}
                    </span>
                  </p>
                  <button
                    onClick={() => setOpenStatusInfo(!openStatusInfo)}
                    className="text-gray-500 hover:text-green-700 focus:outline-none cursor-pointer text-base font-bold ml-2"
                    aria-label="Info about Carbon Footprint Status Levels"
                  >
                    ⓘ
                  </button>
                </div>
                {/* Status Info Popup */}
                {openStatusInfo && (
                  <div
                    ref={statusPopupRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 p-4 bg-green-50 rounded-md shadow-lg z-10 border border-green-200 text-sm text-gray-700 text-left"
                  >
                    <h5 className="font-semibold mb-2">
                      🇮🇳 Carbon Footprint Status Levels (Annual kg CO₂e per Household
                      in India):
                    </h5>
                    <p className="mb-1">
                      <span className="font-semibold text-green-600">✅ Excellent:</span>{' '}
                      Below 3,000 kg CO₂e
                    </p>
                    <p className="mb-1">
                      {' '}
                      <span className="font-semibold">Typical Profile:</span> Rural or
                      low-income households with minimal electricity use, no personal
                      vehicles, and biomass or shared LPG for cooking. Vegetarian
                      diets, minimal processed goods.
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold text-yellow-600">🟡 Good:</span>{' '}
                      3,000 – 8,000 kg CO₂e
                    </p>
                    <p className="mb-1">
                      {' '}
                      <span className="font-semibold">Typical Profile:</span>
                      Lower-middle to middle-class urban families with basic appliance
                      usage, 1–2 LPG cylinders/month, shared or limited vehicle use
                      (scooters), and mixed diet.
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold text-red-600">🔴 High:</span>{' '}
                      Above 8,000 kg CO₂e
                    </p>
                    <p className="mb-1">
                      {' '}
                      <span className="font-semibold">Typical Profile:</span>
                      High-income urban households with ACs, refrigerators, water
                      heaters, personal vehicles (cars), high LPG/electricity
                      consumption, and high carbon food habits (processed, dairy, meat).
                    </p>
                  </div>
                )}
              </div>

              <div className="h-64 w-full flex justify-center items-center">
                {chartData ? <Pie data={chartData} /> : <p className="text-gray-500">No data for chart</p>}
              </div>

              <div className="space-y-4 w-full text-left mt-6 pt-6 border-t border-green-100">
                <h4 className="text-xl font-semibold text-green-800">How to reduce your footprint:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {getRecommendations(results.breakdown).map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 w-full text-left">
                <h4 className="text-lg font-semibold text-green-800">Breakdown:</h4>
                {Object.entries(results.breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-green-100 pb-2">
                    <span className="capitalize text-gray-700">{key}</span>
                    <span className="font-semibold text-green-700">{Math.round(value)} kg CO₂e</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-12 h-full flex items-center justify-center">
              <p className="text-lg">Enter your data and click Calculate to see your results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 