export class CreateDoctorDto {
    readonly doctorFullName: string;
    readonly doctorEmail: string;
    readonly doctorDateOfBirth: string;
    readonly doctorAddress: string;
    readonly doctorPhoneNumber: string;
    readonly doctorNID: string;
    readonly doctorBMDCNo: string;
    readonly doctorSpeciality: string;
    readonly doctorAvailableDay: string;
    readonly doctorStartingTime: string;
    readonly doctorEndingTime: string;
    readonly doctorCommission: number;
    readonly doctorFee: number;
  }