export interface ManagerInfo {
    statusCode: number;
    status: string;
    message: string;
    isSuccess: boolean;
    data: UserData;
  }
  
  export interface UserData {
    id: string;
    name: string;
    companyPhoneNumber: string;
    nationalId: string;
    role: number;
    email: string;
    phoneNumber: string;
  }
  