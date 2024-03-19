import { Accessor, Setter, createEffect, createMemo } from "solid-js";
import useLocalStorage from 'hooks/useLocalStorage';
import { flatten, translator, scopedTranslator } from "@solid-primitives/i18n";
import { dictionaries } from "./languages";
import { HTML } from "../utils/constants";

type Locale = "en" | "es" | "pt";

const [lang, setLang] = useLocalStorage<Locale>("lang", "pt");
const dictionary = createMemo(() => flatten(dictionaries[lang()]));
const translate = translator(dictionary);

createEffect(() => HTML.setAttribute("lang", lang())); 

window.addEventListener("storage", langUpdateListener);

function langUpdateListener(event: StorageEvent) {
  if (event.key == "lang" && event.newValue != null && event.newValue != lang()) {
    setLang(event.newValue as Locale);
  }
}

export function useTranslator(scope: any) {
  return scopedTranslator(translate, scope);
}

export function useLanguage(): [Accessor<Locale>, Setter<Locale>] {
  return [lang, setLang];
}