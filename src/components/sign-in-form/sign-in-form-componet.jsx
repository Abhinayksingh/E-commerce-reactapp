import { useState } from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

import FormInput from "../form-nput/form-input.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInwithGoogle,
  signInWithUserEmailandPassword,
} from "../../utils/firebase/firebase.utils";
import { useContext } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const signInwithGoogle = async () => {
    await signInWithGooglePopup();

    // console.log(response);
  };

  console.log(formFields);

  const resetFormField = (event) => {
    event.preventDefault();

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await signInWithUserEmailandPassword(email, password);

        resetFormField();
      } catch (error) {
        switch (error.code) {
          case "auth/wrong-password":
            alert("incorrect password for mail");
            break;
          case "auth/user-not-found":
            alert("no user associated with this email");
          default:
            console.log(error);
        }
        console.log(error);
      }
    };
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={() => {}}>
        <FormInput
          label=" Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInwithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
