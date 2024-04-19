export interface Interviewee {
  name: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  addedDate: string;
  hrName: string;
  superiorName?: string | null;
  hrId?: string;
  superiorId: string | null;
}

export interface ApiResponse {
  statusCode: number;
  status: string;
  message: string;
  isSuccess: boolean;
  data: {
    page: number;
    size: number;
    count: number;
    items: Interviewee[];
  };
}
