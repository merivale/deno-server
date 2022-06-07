import { Status, STATUS_TEXT } from "./deps.ts"

export type Error<T> = (request: T, status: Status) => string | Record<string, unknown> | Response

export const error = (_: Request, status: Status) => ({ error: status, message: STATUS_TEXT.get(status) })
