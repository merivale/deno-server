import { type Maybe, extname, fromEither, safely } from "./deps.ts"
import { fileResponse } from "./response.ts"

export default async (path: string): Promise<Maybe<Response>> => createFileResponse(path, await readFile(path))

const readFile = async (path: string): Promise<Maybe<Uint8Array>> => fromEither(await safely(() => Deno.readFile(path)))

const createFileResponse = (path: string, file?: Uint8Array): Maybe<Response> =>
  file ? fileResponse(file, extname(path)) : undefined
