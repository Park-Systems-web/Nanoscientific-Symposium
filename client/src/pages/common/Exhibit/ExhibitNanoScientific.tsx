import React, { useEffect } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import useMenuStore from "store/MenuStore";

const ExhibitNanoScientific = () => {
  const menuStore = useMenuStore();
  const [HTML, loading] = useHTML("/api/page/common/exhibit/nanoscientific");

  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default ExhibitNanoScientific;
