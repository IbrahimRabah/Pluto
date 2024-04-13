// Define an interface for the data object
export interface statistics {
  totalSalesMen: number;
  totalTeamLeaders: number;
  totalHRs: number;
  totalRetentions: number;
  totalInterviewees: number;
  totalClients: number;
  totalActiveClients: number;
  totalInactiveClients: number;
  totalOffClients: number;
  totalClientLots: number;
  amountClientLots: number;
  totalFirstDeposits: number;
  totalRedeposits: number;
  totalDeposits: number;
  amountOfFirstDeposit: number;
  amountOfRedeposits: number;
  totalAmountOfDeposits: number;
  totalInActiveFirstDeposits: number;
  totalInActiveRedeposits: number;
  totalInActiveDeposits: number;
  amountInActiveOfFirstDeposit: number;
  amountInActiveOfRedeposits: number;
  totalInactiveAmountOfDeposits: number;
}
export interface statisticsResponse {
  statusCode: number;
  status: string;
  message: string;
  isSuccess: boolean;
  data: statistics;
  
}
