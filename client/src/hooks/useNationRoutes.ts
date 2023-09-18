import ChinaRoutes from "Routes/ChinaRoutes";
import AsiaRoutes from "Routes/AsiaRoutes";
import KoreaRoutes from "Routes/KoreaRoutes";
import UsRoutes from "Routes/UsRoutes";
import EuropeRoutes from "Routes/EuropeRoutes";
import JapanRoutes from "Routes/JapanRoutes";
import useCurrentURL from "./useCurrentURL";

const useNationRoutes = (): any[] => {
  const currentURL = useCurrentURL();

  if (currentURL === "china") {
    return [ChinaRoutes];
  }
  return [AsiaRoutes, KoreaRoutes, UsRoutes, EuropeRoutes, JapanRoutes];
};

export default useNationRoutes;
