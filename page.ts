import { type Maybe, fromEither, safely } from "./deps.ts"
import { type Process } from "./process.ts"
import { response } from "./response.ts"

type PageModule<T> = { default: (request: T) => string | Record<string, unknown> | Response }

const page = async <T>(request: Request, processRequest: Process<T>, path: string): Promise<Maybe<Response>> =>
  createPageResponse(request, processRequest, path, await readModule(path))

export default page

const readModule = async <T>(path: string): Promise<Maybe<PageModule<T>>> =>
  fromEither(await safely(() => import(`./page/${path}.tsx`)))

const createPageResponse = async <T>(
  request: Request,
  process: Process<T>,
  path: string,
  module?: PageModule<T>
): Promise<Maybe<Response>> =>
  module?.default && typeof module.default === "function"
    ? response(module.default(await process(request)), 200)
    : path.includes("/")
    ? await page(request, process, path.split("/").slice(0, -1).join("/"))
    : undefined
