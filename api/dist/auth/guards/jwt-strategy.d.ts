/// <reference types="passport" />
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => import("passport").Strategy & import("passport").StrategyCreatedStatic;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        user: any;
    }>;
}
export {};
