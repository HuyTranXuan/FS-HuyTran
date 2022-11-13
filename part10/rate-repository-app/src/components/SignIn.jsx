import { Text, Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const initialValues = {
  username: '',
  password: '',
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: '20px',
    alignItems: 'flex-start',
    gap: '20px',
    backgroundColor: '#f6f8f8',
  },
  button: {
    width: '100%',
    backgroundColor: '#0366d6',
    padding: '7px',
    borderRadius: 5,
    borderColor: 'black',
    alignSelf: 'center',
  },
  text: {
    color: '#f6f8f8',
    alignSelf: 'center',
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" isPassword />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  let navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data } = await signIn({ username, password })
      if (data.authenticate.accessToken) navigate('../', { replace: true })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
const validationSchema = yup.object().shape({
  username: yup
    .string()
    // .min(4, 'Username must be longer than 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    // .min(4, 'Password must be longer than 3 characters')
    .required('Password is required'),
})

export default SignIn
