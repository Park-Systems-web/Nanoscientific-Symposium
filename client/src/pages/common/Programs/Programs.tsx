import React from "react";
import ProgramsList from "components/Programs/ProgramsList";
import usePageViews from "hooks/usePageViews";
import useCurrentYear from "hooks/useCurrentYear";

const Programs = () => {
  const pathname = usePageViews();
  const currentYear = useCurrentYear();

  return <ProgramsList concurrent={pathname === "asia"} />;
};

export default Programs;
