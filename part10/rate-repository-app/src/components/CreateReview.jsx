import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  text: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  // console.log('hey');
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="text" placeholder="Review" multiline />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { data, errors } = await createReview({
      variables: { review: { ...values, rating: Number(values.rating) } },
    });
    console.log(data, errors);
    // errors && window.alert('error!')
    if (data.createReview.repositoryId)
      navigate(`/${data.createReview.repositoryId}`, { replace: true });
  };

  return <CreateReviewFormContainer handleSubmit={onSubmit} />;
};

export const CreateReviewFormContainer = ({ handleSubmit }) => (
  <Formik
    initialValues={{
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

export default CreateReview;
