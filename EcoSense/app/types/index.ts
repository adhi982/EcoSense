export interface CalculatorInputs {
  electricity: number
  gas: number
  carMiles: number
  publicTransport: number
  diet: 'vegan' | 'vegetarian' | 'omnivore'
  waste: number
}

export interface CalculatorResults {
  total: number
  breakdown: {
    electricity: number
    gas: number
    transport: number
    diet: number
    waste: number
  }
}

export interface ChartData {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    borderColor?: string
    borderWidth?: number
  }[]
} 