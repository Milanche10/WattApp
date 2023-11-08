export interface Prediction {
  // timestamp: string | number | Date
  date: string
  predictions: predictions[]
}

export interface predictions {
  day: string
  hour: string
  usage: number
  produced: number
}

export interface PredictionMonthSum {
  date: Date
  sumOFUsage: number
  sumOFProduced: number
}
export interface PredictionMonthSum {
  date: Date
  sumOFUsage: number
  sumOFProduced: number
}

export interface PredictionDaySum {
  day: string
  sumOFUsage: number
  sumOFProduced: number
}

export interface DailyPrediction{
  day: Date;
  sumOFUsage: number;
  sumOFProduced: number;
}