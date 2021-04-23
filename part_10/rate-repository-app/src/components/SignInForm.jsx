import { Formik } from "formik";
import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import * as yup from "yup";
import { useSignIn } from "../hooks";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    padding: 20,
  },
  field: {
    borderColor: theme.colors.border,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: "center",
  },
  text: {
    color: theme.colors.buttonText,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
});

const Form = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name={"username"}
        placeholder={"Username"}
        style={styles.field}
      />
      <FormikTextInput
        name={"password"}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.field}
      />
      <Pressable onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.text}>Sign in</Text>
        </View>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(2, "Username must be at least 2 characters long"),
  password: yup
    .string()
    .required()
    .min(5, "Password must be at least 5 characters long"),
});

const SignInComponent = () => {
  const [signIn, {data}] = useSignIn();

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInComponent;
