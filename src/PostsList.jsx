import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Button, List, Input } from 'semantic-ui-react';

const PostsList = () => {
  const [questions, setQuestions] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setQuestions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchQuestions();
  }, []);

  // Handle post deletion
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setQuestions(questions.filter(question => question.id !== id));
  };

  // Handle post filtering
  const handleFilter = () => {
    const filtered = questions.filter(question => {
      return (
        question.title.toLowerCase().includes(filterCriteria.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(filterCriteria.toLowerCase()))
      );
    });
    setQuestions(filtered);
  };

  return (
    <div>
      {/* Filter Input */}
      <Input
        icon='search'
        placeholder='Filter by title or tags...'
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value)}
        action={{
          color: 'blue',
          content: 'Filter',
          onClick: handleFilter,
        }}
      />

      {/* List of posts */}
      <List divided relaxed>
        {questions.map((question) => (
          <List.Item key={question.id}>
            <List.Content>
              <List.Header>{question.title}</List.Header>
              <List.Description>{question.content}</List.Description>
              <List.Extra>{question.tags.join(', ')}</List.Extra>
              <Button color='red' onClick={() => handleDelete(question.id)}>
                Delete
              </Button>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default PostsList;
