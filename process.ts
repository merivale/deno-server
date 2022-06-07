export type Process<T> = (request: Request) => Promise<T>

export const process = async (request: Request): Promise<Request> => request
