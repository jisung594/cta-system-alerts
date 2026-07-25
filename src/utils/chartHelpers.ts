import type { CTAServiceAlert, CTALine } from '../types/alerts';

export interface LineAlertData {
  line: CTALine;
  alertCount: number;
  color: string;
}


export const aggregateAlertsByLine = (alerts: CTAServiceAlert[]): LineAlertData[] => {

}