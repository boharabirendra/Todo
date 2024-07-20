export class ApiError extends Error{
    statusCode: number;
    success: boolean;
    errorType: string;
    errorSource: string;
    constructor(statusCode: number, message: string, errorType?: string, errorSource?:string){
        super(message)
        this.statusCode = statusCode;
        this.success = false;
        this.errorType = errorType;
        this.errorSource = errorSource;
    }
}