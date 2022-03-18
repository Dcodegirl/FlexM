import React from "react";
import logo from "../../../assets/images/cico-logo.svg";
import Form from "../../../components/common/Form";
import FormGroup from "../../../components/common/FormGroup";
import Input from "../../../components/common/Input";
import Submit from "../../../components/common/Button";
// import { takeRight } from "lodash";

export const CommissionForm = (props) => {
  const { dispatch, state, setStatus } = props;

  // useEffect(() => {
  //       const { amount } = state;
  // }, [state.amount]);
  
  const handleOnProceed = (e) => {
    e.preventDefault();
    setStatus("summary");
  };

  const handleOnChange = ({ target }) => {
  
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <div>
      <Form
        autoComplete="off"
        title="Commission Transfer"
        caption="Make a transfer of your commission"
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
            type="number"
            value={state.amount}
            handleOnChange={handleOnChange}
          />
        </FormGroup>
        <Submit
          type="submit"
          disabled={!state.amount}>
          Submit
        </Submit>
      </Form>
    </div>
  );
};

export default CommissionForm;
