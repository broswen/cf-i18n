import template from "./template.html";
import { I18nRewriter, TranslationMap } from './I18nRewriter';
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

const TRANSLATION_MAP: TranslationMap = {
	"en-us": {
		"title": "Hello World!",
		"title.description": "This is a test translation.",
		"number": 3.1415,
		"date": () => new Date().toLocaleDateString("en-us")
		},
	"es-es": {
		"title": "Hola Mundo!",
		"title.description": "Esta es una traducción de prueba.",
		"number": 3.1415,
		"date": () => new Date().toLocaleDateString("es-es")
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)

		// get language code from HTTP Accept-Language header
		// TODO make this more robust and handle multiple preferences
		const acceptLanguage = (request.headers.get("Accept-Language") ?? "en-us").split(",")[0].toLowerCase();

		// create response with template and set Content-Language with the language chosen
		let res = new Response(template, {
			headers:{
				"Content-Type": "text/html",
				"Content-Language": acceptLanguage
			}
		});
    // create i18n rewriter with translation context
		const rewriter = new HTMLRewriter()
			.on("*[i18n]", new I18nRewriter(acceptLanguage, TRANSLATION_MAP))
			.on("html[lang]", new I18nRewriter(acceptLanguage, TRANSLATION_MAP))

		// return the response while transforming the content
		return rewriter.transform(res)
	},
};
