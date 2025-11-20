import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { ModuleResponse } from "./module-response";
import { OperationResponse } from "./operation-response";


export class Authorizations {
    @ValidateNested()
    @Type(() => ModuleResponse)
    module: ModuleResponse;
    @ValidateNested({ each: true })
    @Type(() => OperationResponse)
    @IsArray()
    operations: OperationResponse[];
}