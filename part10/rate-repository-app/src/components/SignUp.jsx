import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Minimum 1 character for this field')
    .max(30, 'Maximum 30 characters for this field'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Minimum 5 characters for this field')
    .max(50, 'Maximum 50 characters for this field'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Wrong password confirmation'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign up</Button>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const { data, errors } = await createUser({
      variables: { user: { username, password } },
    });
    console.log(data, errors);
    errors && window.alert('error!');
    if (data.createUser.username) await signIn({ username, password });
    navigate('/', { replace: true });
  };

  return <SignUpFormContainer handleSubmit={onSubmit} />;
};

export const SignUpFormContainer = ({ handleSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
);

export default SignUp;
