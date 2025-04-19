import styles from './UserHomePageStyle.module.css';
import 'material-icons/iconfont/material-icons.css';

function UserHomePage() {
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
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>local_atm</span>
            <h3>Pay Tolls</h3>
            <p>Quickly pay tolls across supported regions with ease.</p>
          </div>

          <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>gavel</span>
            <h3>Settle Traffic Violations</h3>
            <p>Resolve your traffic violations directly through our system.</p>
          </div>

          <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>local_parking</span>
            <h3>Pay Parking Fees</h3>
            <p>Pay for public or private parking easily and instantly.</p>
          </div>

          <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>directions_car</span>
            <h3>Add Cars</h3>
            <p>Register and manage all your vehicles in one place.</p>
          </div>

          <div style={{ border: '2px solid white', borderRadius: '20px', padding: '1.5rem', minWidth: '250px', textAlign: 'center', flex: '1' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#00FFCC' }}>verified_user</span>
            <h3>Buy Insurance</h3>
            <p>Choose from multiple insurers to get the best car coverage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
