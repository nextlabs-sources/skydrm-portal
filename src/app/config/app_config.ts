import { environment } from "src/environments/environment";

export class AppConfig {
    static rmsHost:string = environment.rmsHost;
    static rmsRegisterUrl:string = environment.rmsRegisterUrl;
    static rmsLoginUrl:string = environment.rmsLoginUrl;

}