// @ts-ignore: deno imports failing next build
import type { Context } from "netlify:edge";
import manifest from "../../src/context/manifest.json" assert { type: "json" };
import {
    createEdgeContext,
    createUniformEdgeHandler,
    buildNetlifyQuirks,
} from "../../src/context/index.deno.js";

const IGNORED_PATHS = /\/.*\.(ico|png|jpg|jpeg|svg|css|js|json)(?:\?.*|$)$/g;

export default async (request: Request, netlifyContext: Context) => {
    // ignoring requests that are not pages
    if (
        request.method.toUpperCase() !== "GET" ||
        request.url.match(IGNORED_PATHS)
    ) {
        return await netlifyContext.next({ sendConditionalRequest: true });
    }

    const context = createEdgeContext({
        manifest: manifest,
        request,
        options: {
            defaultConsent: false,
            requireConsentForPersonalization: true,
        },
    });

    const originResponse = await netlifyContext.next();

    const handler = createUniformEdgeHandler();

    const { latitude, longitude, timezone } = netlifyContext.geo || {};
    const { processed, response } = await handler({
        context,
        request,
        response: originResponse,
        quirks: {
            ...buildNetlifyQuirks(netlifyContext), latitude, longitude, timezone
        },
    });

    // logging, feel free to remove it
    if (processed) {
        console.log("Edge Function:", { url: request.url, processed });
    }

    if (!processed) {
        return response;
    }

    return new Response(response.body, {
        ...response,
        headers: {
            // ...response.headers, Symbol cannot be destructured
            "Cache-Control": "no-store, must-revalidate",
            "Content-Type": "text/html; charset=utf-8", // To apply automatic deno compression, more info https://deno.com/deploy/docs/compression
            Expires: "0",
        },
    });
};
