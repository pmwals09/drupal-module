import { useNavigate, useSearchParams } from "react-router-dom";
import { useSpeech } from "./SpeechContext.jsx";

export function useCustomNavigate() {
  const routerNavigate = useNavigate();
  const [params] = useSearchParams();
  const { clearRepeatContext } = useSpeech();

  function navigate(path, paramsOverrides) {
    const originalRouteParams = {};
    params.forEach((value, key) => {
      originalRouteParams[key] = value;
    });

    const [root, query] = path.split("?");

    const pathParams = {};
    query
      ?.split("&")
      ?.map((ea) => ea.split("="))
      ?.forEach(([key, value]) => {
        pathParams[key] = value;
      });

    const newRouteParamsObj = {
      ...originalRouteParams,
      ...pathParams,
      ...paramsOverrides,
    };

    const newRouteParams = new URLSearchParams(newRouteParamsObj);

    const qs = newRouteParams.toString();

    const newPath = `${root}${qs ? `?${qs}` : ""}`;

    clearRepeatContext();
    routerNavigate(newPath);
  }

  return navigate;
}
