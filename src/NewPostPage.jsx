import React, { useState } from 'react';
import { Form, Button, Header, Segment } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import { collection, addDoc } from 'firebase/firestore';  // Import Firebase methods
import { db } from './firebase';  // Firebase config

const NewPostPage = () => {
  // Form states
  const [postType, setPostType] = useState('');  // 'question' or 'article'
  const [formTitle, setFormTitle] = useState('');  // For title input
  const [formContent, setFormContent] = useState('');  // For content/description input
  const [formTags, setFormTags] = useState('');  // For tags input

  // Post type handler
  const handlePostTypeChange = (e, { value }) => setPostType(value);

  // Submit handler
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title: formTitle,
        content: formContent,
        tags: formTags,
        type: postType,
        timestamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      alert('Post saved successfully!');  // Optionally notify the user
      // Clear form after submission
      setFormTitle('');
      setFormContent('');
      setFormTags('');
      setPostType('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <Segment
        style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}
        textAlign='left'
      >
        <Header as='h2' style={{ fontWeight: 'bold' }}>New Post</Header>
      </Segment>

      <Header as='h4'>Select Post Type:</Header>
      <Form>
        <Form.Group inline>
          <Form.Radio
            label='Question'
            value='question'
            checked={postType === 'question'}
            onChange={handlePostTypeChange}
          />
          <Form.Radio
            label='Article'
            value='article'
            checked={postType === 'article'}
            onChange={handlePostTypeChange}
          />
        </Form.Group>
      </Form>

      <Segment
        style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '20px' }}
      >
        <Header as='h4' style={{ fontWeight: 'bold' }}>What do you want to ask or share?</Header>
      </Segment>

      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        This section is designed based on the type of the post. It could be developed by conditional rendering. For an article, the following section would be appeared.
      </p>

      <Segment padded='very'>
        {/* Conditionally render form based on postType */}
        {postType === 'question' && (
          <QuestionForm
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formContent={formContent}
            setFormContent={setFormContent}
            formTags={formTags}
            setFormTags={setFormTags}
          />
        )}
        {postType === 'article' && (
          <ArticleForm
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formContent={formContent}
            setFormContent={setFormContent}
            formTags={formTags}
            setFormTags={setFormTags}
          />
        )}

        {/* Submit button */}
        <Button 
          primary 
          style={{ float: 'right' }}
          onClick={handleSubmit}  // Trigger the form submission
        >
          Post
        </Button>
      </Segment>
    </>
  );
};

export default NewPostPage;
