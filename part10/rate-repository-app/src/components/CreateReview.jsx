import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
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
  repoOwner: yup.string().required('Repository owner name is required'),
  repoName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required'),
  review: yup.string().required('Review is required'),
});

const CreateReviewForm = ({ onSubmit }) => {
  console.log('hey');
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repoOwner" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repoName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="review" placeholder="Review" />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;
    console.log('yooo', repoOwner, repoName, rating, review);

    await signIn({ repoOwner, repoName, rating, review });

    navigate('/', { replace: true });
  };

  return <CreateReviewFormContainer handleSubmit={onSubmit} />;
};

export const CreateReviewFormContainer = ({ handleSubmit }) => (
  <Formik
    initialValues={{ repoOwner: '', repoName: '', rating: '', review: '' }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

export default SignIn;
