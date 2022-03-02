import React, { useState, useEffect } from "react";
import EuropeRegistrationForm from "components/EuropeRegistration/EuropeRegistrationForm";
import { Button, Box } from "@mui/material";

import { RegistrationContainer } from "./EuropeRegistrationStyles";

const EuropeRegistration = () => {
  const [registerFee, setRegisterFee] = useState<string>("");
  return (
    <RegistrationContainer>
      <Box className="registration-desc">
        <p className="reg-head">Registration</p>
        <Box className="reg-body">
          <p>
            Deadline: <span className="red">20 September 2022</span>
          </p>
          <p>
            Please fill in the registration form and your choice for
            hands-on-sessions.
          </p>
          <p>
            After successful registration, you will receive an email with your
            individual link to join the virtual conference.
          </p>
        </Box>
      </Box>
      {registerFee !== "20" && registerFee !== "35" && (
        <>
          <Button
            onClick={() => {
              setRegisterFee("20");
            }}
          >
            20
          </Button>
          <Button
            onClick={() => {
              setRegisterFee("35");
            }}
          >
            35
          </Button>
        </>
      )}
      {registerFee === "20" && <EuropeRegistrationForm registerFee="20" />}
      {registerFee === "35" && <EuropeRegistrationForm registerFee="35" />}
    </RegistrationContainer>
  );
};

export default EuropeRegistration;
