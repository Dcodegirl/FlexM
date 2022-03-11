import React, { useEffect, useState } from "react";
import axios from "axios";

import { VALIDATE_AGENT } from "../../../utils/constants";

import logo from "../../../assets/images/cico-logo.svg";

import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Submit from "../../../components/common/Button";

export const CommissionForm = (props) => {
  const { dispatch, state, setStatus } = props;
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    let isCancelled = false;

    if (state.commission_id.length > 9) {
      setVerificationLoading(true);
      (async function validateAgent() {
        const { commission_id } = state;

        const req = {
          commission_id,
        };

        try {
          const res = await axios.post(VALIDATE_AGENT, req);

          const agent_name = res.data.data.business_name;

          setVerificationLoading(false);

          if (!isCancelled) {
            dispatch({
              type: "UPDATE_STATE",
              payload: { agent_name },
            });
          }
        } catch (e) {
          if (!isCancelled) {
            dispatch({
              type: "UPDATE_STATE",
              payload: { agent_name: "" },
            });
          }
          setError({
            error: true,
            text: "Agent validation failed",
          });
          setVerificationLoading(false);
        }
      })();
    }

    return () => {
      isCancelled = true;
    };
  }, [state.commission_id]);

  const handleOnProceed = (e) => {
    e.preventDefault();
    setStatus("summary");
  };

  const handleOnChange = ({ target }) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <div>
      <Form
        autoComplete="off"
        title="Commission"
        caption="Commission"
        handleOnSubmit={handleOnProceed}
        logo={logo}
      >
        {/* <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} alt="" />
        </div> */}
        <FormGroup>
          <Input
            label="Amount"
            placeholder="Amount"
            name="amount"
            type="text"
            value={state.amount}
            onChange={handleOnChange}
          />
        </FormGroup>
        <Submit
          type="submit"
          disabled={!state.amount || !state.wallet_id || !state.agent_name}
        >
          Submit
        </Submit>
      </Form>
    </div>
  );
};

export default CommissionForm;
