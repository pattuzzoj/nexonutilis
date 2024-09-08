import { scopedTranslator, translate } from "i18n";
import MetaData from "components/meta";

export default function Home() {
  const t = scopedTranslator(translate, "home");

  return (
    <>
      <MetaData title={t("meta.title")} description={t("meta.description")} keywords={t("meta.keywords")}/>
    </>
  );
}
