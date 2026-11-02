import en from "../../../content/home/en.json";
import fa from "../../../content/home/fa.json";
import {
  homeContentSchema,
  type HomeContent,
  type HomeLocale,
} from "./home-content-schema";

const contentByLocale: Record<HomeLocale, HomeContent> = {
  fa: homeContentSchema.parse(fa),
  en: homeContentSchema.parse(en),
};

export function getHomeContent(locale: HomeLocale): HomeContent {
  return contentByLocale[locale];
}

export { homeContentSchema };
