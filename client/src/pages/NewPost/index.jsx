import React, { useContext } from 'react';

const NewPost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newPostForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append('author', currentUser.userId);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type="text" />, 20)
      ) : (
        <div className="container-create-page">
          <form className="form form__create">
            <h2>Create a new post</h2>
            {formInputs}
            <button
              onClick={postSubmitHandle}
              className="btn"
              disabled={!isFormValid()}
            >
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewPost;
