export interface UserRegister {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  companyPhoneNumber: string;
  nationalId: string;
  role: number;
  superiorRole?: number;
  teamLeaderId?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
export interface LoginResponse {
  statusCode: number;
  status: string;
  message: string;
  isSuccess: boolean;
  data: {
    name: string;
    role: number;
    roleName: string;
    tenantId: string;
    token: string;
    id: string;
  };
}

