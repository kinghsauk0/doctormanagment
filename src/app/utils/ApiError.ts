class ApiError extends Error {
    public statusCode: number;
    public errors: string[];
    public success: boolean;
    public data: any;
    status: any;

    constructor(
        statusCode: number,
        message: string = "Something is wrong",
        errors: string[] = [],
        stack: boolean = false
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack as any; 
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;