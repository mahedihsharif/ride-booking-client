export const globalErrorResponse = (error) => {
    if (error &&
        typeof error === "object" &&
        "status" in error &&
        "data" in error) {
        const err = error;
        return err;
    }
    return null;
};
