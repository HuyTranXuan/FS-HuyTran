import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({})

const TextInput = ({ isPassword, style, error, ...props }) => {
  const textInputStyle = [style]
  return isPassword ? (
    <NativeTextInput style={textInputStyle} {...props} secureTextEntry />
  ) : (
    <NativeTextInput style={textInputStyle} {...props} />
  )
}

export default TextInput
