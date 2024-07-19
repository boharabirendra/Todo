export class ApiError extends Error{
    statusCode: number;
    success: boolean;
    errorType: string;
    constructor(statusCode: number, message: string, errorType?: string){
        super(message)
        this.statusCode = statusCode;
        this.success = false;
        this.errorType = errorType
    }
}