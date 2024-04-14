// errorHandler function is used to handle the error message and status code that wii be passed from the controllers
export const errorHandler = (msg,stat) => {
    const error = new Error ();
    error.message = msg;
    error.statusCode = stat;
    return error;
}