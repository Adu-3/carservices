import styles from './formStyle.module.css';
import { useState } from 'react';

const dummyForms = [
  {
    id: 1,
    title: 'Website Feedback Survey',
    user: 'Abdullah Alghamdi',
    questions: [
      { q: 'Do you like the overall design of the website?', a: 'Strongly Agree' },
      { q: 'Is the website easy to navigate?', a: 'Agree' },
      { q: 'Are the colors and fonts visually pleasing?', a: 'Neutral' },
      { q: 'Does the website load quickly?', a: 'Disagree' },
      { q: 'Would you recommend this site to others?', a: 'Strongly Agree' },
    ],
  },
  {
    id: 2,
    title: 'Website Satisfaction Survey',
    user: 'Mohammed Ali',
    questions: [
      { q: 'Do you find the website content helpful?', a: 'Agree' },
      { q: 'Are you satisfied with the user experience?', a: 'Strongly Agree' },
    ],
  },
  {
    id: 3,
    title: 'Detailed Website Review',
    user: 'Fahad Al-Mutairi',
    questions: [
      { q: 'Does the homepage clearly explain the purpose?', a: 'Strongly Agree' },
      { q: 'Is it easy to find what you are looking for?', a: 'Agree' },
      { q: 'Do the images and icons enhance understanding?', a: 'Neutral' },
      { q: 'Is the mobile experience smooth and consistent?', a: 'Agree' },
      { q: 'Do you feel confident in the site’s security?', a: 'Strongly Agree' },
      { q: 'Is the text readable and well-formatted?', a: 'Agree' },
      { q: 'Are all pages functioning as expected?', a: 'Strongly Agree' },
      { q: 'Would you return to use the website again?', a: 'Strongly Agree' },
    ],
  },
];

function AdminFormsPage() {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`}>description</span>
        <p className={styles.logoName}>Form Responses</p>
      </div>

      <div className={styles.form} style={{ width: '100%' }}>
        {selectedForm ? (
          <>
            <h2 className="text-white text-xl mb-4">{selectedForm.title}</h2>
            <p className="text-white mb-4"><strong>User:</strong> {selectedForm.user}</p>
            {selectedForm.questions.map((item, index) => (
              <div key={index} className="text-white mb-4">
                <p><strong>Q{index + 1}:</strong> {item.q}</p>
                <p><strong>A:</strong> {item.a}</p>
              </div>
            ))}
            <button
              className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.backButton}`}
              onClick={() => setSelectedForm(null)}
            >
              Return to Form Page
            </button>
          </>
        ) : (
          dummyForms.map((form) => (
            <div key={form.id} className={`mb-6 text-white ${styles.formCard}`}>
              <p><strong>Form:</strong> {form.title}</p>
              <p><strong>User:</strong> {form.user}</p>
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
