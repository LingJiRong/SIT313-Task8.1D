import React from 'react';
import { Form, Input, Segment } from 'semantic-ui-react';

const QuestionForm = () => (
  <Form>
    <Form.Field>
      <label>Title</label>
      <input placeholder='Start your question with how, what, why, etc.' />
    </Form.Field>
    <Form.Field>
      <label>Describe Your Problem</label>
      <textarea placeholder=' ' />
    </Form.Field>

    <Form.Field>
      <label>Tags</label>
      <Form.Group widths='equal'>
        <Input
          placeholder='Please add up tp 3 tags to describe what your question is about e.g., Java'
          fluid
        />
      </Form.Group>
    </Form.Field>
  </Form>
);

export default QuestionForm;
