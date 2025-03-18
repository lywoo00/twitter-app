import { FiImage } from "react-icons/fi";

const PostForm = () => {
  const handleFileUpload = () => {};
  return (
    <form className="post-form">
      <textarea
        className="post-form__textarea"
        name="content"
        id=""
        placeholder="What is happening?"
        required
      />
      <div className="post-form__submitarea">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
          <input
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostForm;
