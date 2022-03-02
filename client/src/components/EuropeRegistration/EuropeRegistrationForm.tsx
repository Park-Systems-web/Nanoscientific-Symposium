import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import axios from "axios";
import usePageViews from "../../hooks/usePageViews";
import { RegistrationContainer } from "./EuropeRegistrationFormStyles";

interface EuropeRegistrationProps {
  registerFee: "20" | "35";
}

const EuropeRegistrationForm = ({ registerFee }: EuropeRegistrationProps) => {
  const [checkout, setCheckout] = useState<boolean>(false);
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailValidationMsg, setEmailValidationMsg] = useState<string>("");
  const navigate = useNavigate();
  const nation = usePageViews();

  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      1065,
      (form: any) => {
        form.getFormElem()[0][19].remove();
        setMktoLoading(false);

        // validation & 중복체크
        document
          .querySelector("input#Email")
          ?.addEventListener("focusout", async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (
              target.value.indexOf("@") === -1 &&
              target.value.indexOf(".") === -1
            ) {
              setEmailValid(false);
              setEmailValidationMsg("");
            } else {
              try {
                const res = await axios.post("/api/users/checkemail", {
                  email: target.value,
                  nation,
                });
                setEmailValid(!res.data.result);
                setEmailValidationMsg(
                  res.data.result ? "Duplicate email." : "",
                );
              } catch (err) {
                console.log(err);
              }
            }
          });
      },
    );
  }, []);

  return (
    <RegistrationContainer>
      <Box
        className={
          emailValid ? "validation-msg valid" : "validation-msg invalid"
        }
      >
        &nbsp;{emailValidationMsg}
      </Box>
      <form id="mktoForm_1065" />
      {!mktoLoading && !checkout && (
        <Button
          variant="contained"
          className="mktoButton2"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (window.MktoForms2.allForms()[0]?.validate() && emailValid) {
              setCheckout(true);
            } else {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.MktoForms2.allForms()[0]
                .getFormElem()[0][0]
                .scrollIntoView({
                  behavior: "smooth",
                });
            }
          }}
        >
          CHECKOUT
        </Button>
      )}
      {checkout && (
        <div className="paypal-container">
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ab7DDztb5dlZOIvcQER01Iw0RsBanvxQBRNiiL6ORL56nYEZhF0CuSyTNNOj5ZwyTszzAD1ht4P4lGbA",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ color: "blue" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: registerFee,
                      },
                    },
                  ],
                });
              }}
              onError={() => {
                alert("Paypal Module Error. Please try again later.");
              }}
              onApprove={async (data, actions) => {
                const result = actions?.order
                  ?.capture()
                  .then(async (details) => {
                    const transactionId = details.id;
                    // snackBar?

                    const formData =
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      window.MktoForms2.allForms()[0].getValues();
                    try {
                      // user db submit
                      const regResponse = await axios.post(
                        "/api/page/eu/register",
                        {
                          email: formData.Email,
                          title: formData.Title,
                          university: formData.Company,
                          institute: formData.Department,
                          street: formData.City,
                          zipCode: formData.PostalCode,
                          city: formData.State,
                          researchField: formData.psResearchTopic,
                          afmTool: formData.psExistingAFMBrand,
                          nanoMechanical: formData.psnsforumregistrationq01,
                          characterizationOfSoft:
                            formData.psnsforumregistrationq02,
                          advancedImaging: formData.psnsforumregistrationq03,
                          highResolutionImaging:
                            formData.psnsforumregistrationq04,
                          automationInAfm: formData.psnsforumregistrationq05,
                          lastName: formData.LastName,
                          firstName: formData.FirstName,
                          psOptIn: formData.psOptIn === "yes" ? 1 : 0,
                        },
                      );

                      // save transaction to db
                      await axios.post("/api/page/eu/transaction", {
                        id: transactionId,
                        userId: regResponse.data.id,
                      });

                      // marketo submit
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      window.MktoForms2.allForms()[0]
                        .submit()
                        .onSuccess(() => {
                          console.log("mkto success");
                          return false;
                        });

                      // automatically login
                      await axios.post("/api/users/login", {
                        email: formData.Email,
                        password: null,
                        nation,
                      });

                      // home redirection
                      navigate("/");
                    } catch (err) {
                      console.log(err);
                      alert("error: saving user data. Please try again.");
                    }
                    // });
                  });
                return result;
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </RegistrationContainer>
  );
};

export default EuropeRegistrationForm;
