import styles from './AdminHomePageStyle.module.css';
import 'material-icons/iconfont/material-icons.css';

function AdminHomePage() {
  return (
    <div className={styles.body}>
      <div className={`${styles.box} container`} style={{ flexDirection: 'column', padding: '3rem 2rem' }}>
        <div className={styles.logoCombined}>
          <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>directions_car</span>
          <p className={styles.logoName} style={{ display: 'inline', fontSize: '4rem' }}>Car Services</p>
          <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center', marginTop: '1rem' }}>
            Do Your Car Services<br />Wherever You Go
          </p>
        </div>

        <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '2rem 0 1.5rem 0' }}>Our Features</h2>

        <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem',
        width: '100%'
        }}>
        <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
          <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>supervisor_account</span>
          <h3>Manage Users & Vehicles</h3>
          <p>View, edit, and manage all users and their registered cars.</p>
        </div>

        <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
          <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>business</span>
          <h3>Create Service Providers</h3>
          <p>Add or manage service providers like insurance companies.</p>
        </div>

        <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
          <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>description</span>
          <h3>View User Forms</h3>
          <p>Access and review forms submitted by users.</p>
        </div>
      </div>

      </div>
    </div>
  );
}

export default AdminHomePage;
