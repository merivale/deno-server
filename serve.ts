import { serve } from "./deps.ts"
import { type Process } from "./process.ts"
import { type Error } from "./error.ts"
import router from "./router.ts"

export default <T>(process: Process<T>, error: Error<T>): Promise<void> =>
  serve(async (request: Request) => await router(request, process, error))
