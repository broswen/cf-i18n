
export type TranslationValue = string | (() => string) | number | undefined
export interface TranslationContext {
	[key: string]: TranslationValue
}
export interface TranslationMap {
	[key: string]: TranslationContext
}

export class I18nRewriter implements HTMLRewriterElementContentHandlers {
	translationMap: TranslationMap
	context: TranslationContext | undefined
	language: string
	constructor(language: string, translationMap: TranslationMap) {
		this.language = language;
		this.translationMap = translationMap;
		this.context = translationMap[language];
	}

	element(element: Element): void | Promise<void> {
		// handle the <html lang="en"> attribute
		if (element.tagName === "html" && element.getAttribute("lang") !== null && this.context) {
			element.setAttribute("lang", this.language)
		}

		// get translation key and remove the attribute
		const key = element.getAttribute("i18n");
		element.removeAttribute("i18n");

		// skip if context for the language code is undefined
		if (!this.context) return;

		// skip element if attribute value doesn't exist for some reason
		if (!key) return;

		// get the value for the translation key in the current context
		const value = this.context[key];

		// skip element if key doesn't exist in translation context
		if (!value) return;

		// handle more underlying translation types here
		switch (typeof value) {
			case "string":
				element.setInnerContent(value);
				break;
			case "number":
				// TODO format number based on locale?
				element.setInnerContent(`${value}`);
				break;
			case "function":
				element.setInnerContent(value())
				break;
			default:
				element.setInnerContent(`${value}`)
		}
	}
}
