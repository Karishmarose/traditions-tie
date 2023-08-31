export interface LOGIN_FORM_DATA {
  email_id:string;
  password:string
}
export interface REGISTER_FORM_DATA extends LOGIN_FORM_DATA{
user_name:string;
confirmPassword:string;
role?:number;
}
