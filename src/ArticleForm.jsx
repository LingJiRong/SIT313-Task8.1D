import React, { useState } from 'react';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ArticleForm = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [fileInput, setFileInput] = useState(null); 
  const [imageUploaded, setImageUploaded] = useState(false); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUploaded(false); 
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + image.name);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      console.log('Image uploaded successfully. URL:', url);
      setImageURL(url);
      setImageUploaded(true); 
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Error uploading image. Check console for details.');
    }
  };

  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Title</label>
          <Input placeholder='Enter a descriptive title' />
        </Form.Field>

        <Form.Field>
          <label>Add an image:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '300px',
                height: '200px',
                border: '1px solid #ccc',
                marginRight: '10px',
                textAlign: 'center',
                lineHeight: '200px',
                color: '#aaa',
                overflow: 'hidden'
              }}
            >
              {/* Display placeholder text only when no image is uploaded */}
              {!imageUploaded && !imageURL && 'Image Preview'}
              {/* Display the uploaded image */}
              {imageUploaded && imageURL && (
                <img
                  src={imageURL}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%' }} // Ensure image fits within the container
                />
              )}
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={(input) => setFileInput(input)}
            />
            <Button
              primary
              onClick={() => fileInput.click()}
              style={{ marginRight: '10px' }}
            >
              Browse
            </Button>
            <Button
              primary
              onClick={handleImageUpload}
              disabled={!image}
            >
              Upload
            </Button>
          </div>
        </Form.Field>

        <Form.Field>
          <label>Abstract</label>
          <textarea placeholder='Enter a 1-paragraph abstract' />
        </Form.Field>

        <Form.Field>
          <label>Article Text</label>
          <textarea placeholder='Enter the full article text' />
        </Form.Field>

        <Form.Field>
          <label>Tags</label>
          <Form.Group widths='equal'>
            <Input
              placeholder='Please add up to 3 tags to describe what your article is about e.g., Java'
              fluid
            />
          </Form.Group>
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default ArticleForm;
