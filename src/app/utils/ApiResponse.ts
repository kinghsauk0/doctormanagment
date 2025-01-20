class ApiResponse<T> {
    public statusCode: number;
    public message: string;
    public data: T | null;
    public success: boolean;
    public length?: number;

    constructor(
        statusCode: number,
        message: string = "Success",
        data: T | null = null,
        length?: number
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
        this.length = length;
    }
}

export default ApiResponse;