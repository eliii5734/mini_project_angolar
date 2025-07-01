export enum Gender {
  Male = 'male',
  Female = 'female'
}
export interface User {
    "id": number,
    "username": string,
    "enable": boolean,
    "f_name": string,
    "l_name": string,
    "email": string,
    "managed_sip_users": string,
    "gender": Gender,
    "phone_number": string,
    "birth_date": string,
    "national_code": string,
    "date_employed": string,
    "internal_number": string,
    "internal_number_type": 1,
    "webrtc_username": string,
    "webrtc_password": string,
    "role_name": string
}
