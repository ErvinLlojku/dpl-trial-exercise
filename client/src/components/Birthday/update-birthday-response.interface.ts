export interface UpdateBirthdayResponse {
  setBirthday: {
    code: number;
    success: boolean;
    message: string;
    birthday?: string;
  }
}
