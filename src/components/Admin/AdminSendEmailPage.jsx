import styles from './sendEmailStyle.module.css';
import { useState } from 'react';
import AdminHeader from './AdminHeader';

const dummyUsers = [
  { id: 1, name: 'Abdullah Alghamdi', email: 'abdullah@example.com' },
  { id: 2, name: 'Mohammed Ali', email: 'mohammed@example.com' },
  { id: 3, name: 'Fahad Al-Mutairi', email: 'fahad@example.com' },
];

function AdminSendEmailPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <>
      <AdminHeader active="Service Providers" />    <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>email</span>
        <p className={styles.logoName}>Send Email</p>
      </div>

      <div className={styles.form} style={{ width: '100%' }}>
        {selectedUser ? (
          <>
            <h2 className="text-white text-xl mb-4">To: {selectedUser.name}</h2>
            <p className="text-white mb-4"><strong>Email:</strong> {selectedUser.email}</p>

            <textarea
              className={styles.textarea}
              rows="6"
              placeholder="Type your email message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.infoButton}`}
              onClick={() => alert(`Email sent to ${selectedUser.email}:\n\n${message}`)}
            >
              Send Email
            </button>

            <button
              className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.backButton}`}
              onClick={() => {
                setSelectedUser(null);
                setMessage('');
              }}
            >
              Return to User List
            </button>
          </>
        ) : (
          dummyUsers.map((user) => (
            <div key={user.id} className={`mb-6 text-white ${styles.formCard}`}>
              <p><strong>User:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button
                className={`font-bold cursor-pointer ${styles.infoButton}`}
                onClick={() => setSelectedUser(user)}
              >
                Send Email
              </button>
              <hr className="opacity-30 my-2" />
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}

export default AdminSendEmailPage;
