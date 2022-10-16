import { View, StyleSheet, Text } from 'react-native'
import { useField } from 'formik'

import TextInput from './TextInput'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  form: {
    width: '100%',
    backgroundColor: '#f6f8f8',
    padding: '7px',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  greyText: {
    color: '#575655',
  },
})

const FormikTextInput = ({ isPassword, name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <View style={styles.form}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        isPassword={isPassword}
        style={styles.greyText}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  )
}

export default FormikTextInput
