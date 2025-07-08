export class ValidationError extends Error {
    details: string[];
    type: string;
    constructor(message: string, details: string[] = [], type: string = 'validation') {
        super(message);

        if (details !== undefined && !Array.isArray(details)) {
            throw new TypeError('ValidationError: details deve ser um array');
        }

        this.name = 'ValidationError';
        this.details = details || [];
        this.type = type;
    }

    static createFileError(message: string, filename: string) {
        return new ValidationError(
            message,
            [filename],
            'file'
        );
    }

    static createDataError(message: string, invalidData: string | string[]) {
        return new ValidationError(
            message,
            Array.isArray(invalidData) ? invalidData : [invalidData],
            'data'
        );
    }
}