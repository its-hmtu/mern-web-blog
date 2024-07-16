import React, { useState } from 'react';
import styles from './CreatePost.module.scss';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, content, tags });
  };

  return (
    <div className={styles.createPost}>
      <form onSubmit={handleSubmit}>
        <button type="button" className={styles.coverImage}>
          Add a cover image
        </button>
        <input
          type="text"
          className={styles.title}
          placeholder="New post title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className={styles.tags}
          placeholder="Add up to 4 tags..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className={styles.editor}>
          <div className={styles.toolbar}>
            <button type="button" className={styles.bold}>
              B
            </button>
            <button type="button" className={styles.italic}>
              I
            </button>
            <button type="button" className={styles.link}>
              🔗
            </button>
            <button type="button" className={styles.list}>
              🔢
            </button>
            <button type="button" className={styles.header}>
              H
            </button>
            <button type="button" className={styles.quote}>
              ❝
            </button>
            <button type="button" className={styles.code}>
              ⌘
            </button>
            <button type="button" className={styles.image}>
              🖼
            </button>
          </div>
          <textarea
            className={styles.content}
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.publish}>
            Publish
          </button>
          <button type="button" className={styles.saveDraft}>
            Save draft
          </button>
        </div>
      </form>
      <aside className={styles.instructions}>
        <h3>Writing a Great Post Title</h3>
        <ul>
          <li>
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence.
          </li>
          <li>
            Use keywords where appropriate to help ensure people can find your
            post by search.
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default CreatePost;
