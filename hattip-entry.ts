import { createRouter } from "@hattip/router";
import { renderPage } from "vite-plugin-ssr/server";

const router = createRouter();

/**
 * Vike route
 *
 * @link {@see https://vite-plugin-ssr.com}
 **/
router.use(async (context) => {
  const pageContextInit = { urlOriginal: context.request.url };
  const pageContext = await renderPage(pageContextInit);
  const response = pageContext.httpResponse;

  return new Response(await response?.getBody(), {
    status: response?.statusCode,
    headers: response?.headers,
  });
});

export default router.buildHandler();
