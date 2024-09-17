import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Draggable from 'react-draggable';  // Import Draggable

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const questionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsData);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <Draggable key={question.id}>  {/* Make each question draggable */}
          <div>
            <h3>{question.title}</h3>
            <p>{question.description}</p>
            <p>{question.tags}</p>
            <p>{new Date(question.timestamp.toDate()).toLocaleString()}</p>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default FindQuestionPage;
