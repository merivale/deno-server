import { Status } from "./deps.ts"
import { type Process } from "./process.ts"
import { type Error } from "./error.ts"
import asset from "./asset.ts"
import page from "./page.ts"
import { response as createResponse } from "./response.ts"

export default async <T>(request: Request, processRequest: Process<T>, error: Error<T>): Promise<Response> =>
  (await asset(`./static/${path(request)}`)) ??
  (await page(request, processRequest, path(request))) ??
  createResponse(error(await processRequest(request), Status.NotFound), Status.NotFound)

const path = (request: Request): string => (pathname(request) === "/" ? "index" : pathname(request).slice(1))

const pathname = (request: Request): string => new URL(request.url).pathname
