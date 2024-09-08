import { useNavigate } from "@solidjs/router";
import { translate, scopedTranslator } from "i18n";
import MetaData from "components/meta";

export default function NotFound() {
  const navigate = useNavigate();
  navigate("/404");
  
  const t = scopedTranslator(translate, "notFound");

  return (
    <>
      <MetaData title={t("meta.title")} description={t("meta.description")} keywords={t("meta.keywords")}/>
    </>
  );
}
