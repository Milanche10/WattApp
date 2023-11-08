export interface Record {
  timestamp: string | number | Date
    date: string
    records: records[]
}

export interface records {
    day: string
    hour: string
    usage: number
    produced: number
}

export interface RecordProsummerParams {
  id: string
}

export interface RecordMonthSum {
  date: Date
  sumOFUsage: number
  sumOFProduced: number
}

export interface RecordDaySum{
  day: string
  sumOFUsage: number
  sumOFProduced: number
}

export interface HourlyData {
  usage: number;
  produced: number;
}

export interface DailyData {
  [day: string]: HourlyData;
}
export interface DailyRecord{
  day: Date;
  sumOFUsage: number;
  sumOFProduced: number;
}

