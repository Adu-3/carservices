import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './formStyle.module.css';

function AdminFormsPage() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [forms, setForms] = useState([]);  // Store fetched forms
  const [loading, setLoading] = useState(true);  // Handle loading state
  const [error, setError] = useState('');  // Handle any errors

  useEffect(() => {
    // Fetch forms from the backend
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        setForms(response.data);  // Store the fetched forms in state
      } catch (err) {
        setError('Failed to fetch forms');
        console.error(err);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchForms();
  }, []);

  // Split the info string into questions and answers
  const splitInfo = (info) => {
    const questionAnswerPairs = info.split(';').map(item => {
      const [q, a] = item.split('?');
      return {
        question: `${q}?`, // Add the question mark back
        answer: a.trim()
      };
    });
    return questionAnswerPairs;
  };

  return (
    <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>description</span>
        <p className={styles.logoName}>Form Responses</p>
      </div>

      <div className={styles.form} style={{ width: '100%' }}>
        {loading ? (
          <p className="text-white">Loading forms...</p> // Display loading state
        ) : error ? (
          <p className="text-white">{error}</p> // Display error if fetch fails
        ) : selectedForm ? (
          <>
            <h2 className="text-white text-xl mb-4">{selectedForm.name}</h2>
            <p className="text-white mb-4"><strong>User:</strong> {selectedForm.userName}</p>
            
            {/* Display split questions and answers */}
            <div className="text-white mb-4">
              {splitInfo(selectedForm.info).map((item, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Q{index + 1}: </strong>{item.question}</p>
                  <p><strong>A: </strong>{item.answer}</p>
                </div>
              ))}
            </div>

            <button
              className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.backButton}`}
              onClick={() => setSelectedForm(null)}
            >
              Return to Form Page
            </button>
          </>
        ) : (
          forms.map((form) => (
            <div key={form._id} className={`mb-6 text-white ${styles.formCard}`}>
              <p><strong>Form:</strong> {form.name}</p>
              <p><strong>User:</strong> {form.userName}</p>
              {/* Removed 'info' field display */}
              <button
                className={`font-bold cursor-pointer ${styles.infoButton}`}
                onClick={() => setSelectedForm(form)}
              >
                Form Information
              </button>
              <hr className="opacity-30 my-2" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminFormsPage;
