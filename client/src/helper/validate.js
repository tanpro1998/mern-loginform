import toast from "react-hot-toast";
import { authenticate } from "./helper";

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist");
    }
  }

  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Passwords do not match");
  }
}

export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/** **************************************************** */

function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    errors.password = toast.error("Password must be Required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong password");
  } else if (values.password.length < 4) {
    values.password = toast.error("Password must be at least 4 characters");
  } else if (!specialChars.test(values.password)) {
    values.password = toast.error("Password must have special characters");
  }

  return;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username must be Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid username");
  }

  return error;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong email");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address");
  }

  return error;
}
