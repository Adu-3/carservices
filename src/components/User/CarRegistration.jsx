import styles from './CarRegistrationStyle.module.css';
import { useState } from 'react';

function CarRegistrationPage(){
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedEmirate, setSelectedEmirate] = useState('');

  const carManufacturers = {
    Toyota: ['Camry', 'Corolla', 'Land Cruiser'],
    Ford: ['Mustang', 'Explorer', 'F-150'],
    BMW: ['X5', '3 Series', '5 Series'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson'],
    Nissan: ['Altima', 'Maxima', 'Patrol'],
  };

  const gccCountries = ['Saudi Arabia', 'Qatar', 'UAE', 'Kuwait', 'Bahrain', 'Oman'];
  const colors = ['Red', 'Black', 'White', 'Gray', 'Blue', 'Silver', 'Green', 'Brown', 'Beige', 'Gold', 'Orange', 'Yellow', 'Maroon', 'Navy', 'Bronze', 'Charcoal', 'Teal', 'Burgundy', 'Purple']
  const letters = ['A', 'B', 'J', 'D', 'R', 'S', 'X', 'T', 'E', 'G', 'K', 'L', 'Z', 'H', 'N', 'U', 'V'];
  const uaeEmirates = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al-Quwain', 'Fujairah', 'Ras Al Khaimah'];
  const dubaiPlateCodes = ['K', 'N', 'T', 'W', 'Z', 'L', 'Y', 'V', 'H', 'A', 'B', 'C', 'D', 'E', 'G', 'M', 'I', 'WHITE', 'J', 'S', 'O', 'Q', 'CC', 'DD', 'NN', 'EE', 'HH', 'AA', 'R', 'X', 'BB', 'U', 'P', 'F'];
  const abuDhabiPlateCodes = ['12', '9', '8', '7', '4', '10', '6', '11', '13', 'Red', 'Blue', 'Green', 'Gray', '15', '5', '14', '17', '50', '18', '21', '16', '1', '2', '19', '20'];
  const kuwaitPlateCodes = ['1', '2', '3', '4', '39', '95', '5', '18', '7', '19', '6', '8', '10', '11', '12', '13', '14', '15', '16', '21', '23', '22', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '55', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '78', '77', '79', '20', '51', '52', '53', '54', '56', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '96', '97', '98', '99', '9', '91', '17', '95'];
  const omanPlateLetters = ['A', 'B', 'H', 'D', 'R', 'S', 'T', 'K', 'L', 'M', 'W', 'Y'];

  const elementClass = "border border-white rounded-full bg-black text-white px-5 py-2 h-10";
  const elementStyle = { width: '300px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: '5%'};
  const codeStyle = { width: '100%', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: '5%'};
  const plateNumbersStyle = { width: '110px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', textAlign:'center'};




  const handleManufacturerChange = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setModels(carManufacturers[manufacturer] || []);
    setSelectedModel('');
  };
    return(
        <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
            <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
                <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>directions_car</span>
                <p className={styles.logoName}>Car Registration</p>
             </div>

        
             <div className={styles.form} >

                <div className={styles.formInput}>
                    <label for="nickname">
                        <span className="input-icon material-icons">directions_car</span>
                    </label>
                    <input id="nickname" className={elementClass} style={elementStyle} type="text" placeholder="Nickname" required></input>
                </div>

                <div className={styles.formInput}>
                    <label for="ownerName">
                        <span className="input-icon material-icons">badge</span>
                    </label>
                    <input id="ownerName" className={elementClass} style={elementStyle} type="text" placeholder="Owner's Full Name" required></input>
                </div>

                <div className={styles.formInput}>
                    <label for="color">
                        <span className="input-icon material-icons">palette</span>
                    </label>
                    
                        <div>
                    <select
                        id="color"
                        className={elementClass} style={elementStyle}
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                       
                        <option>Select Color</option>
                        {colors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <div className={styles.formInput}>
                    <label for="year">
                        <span className="input-icon material-icons">calendar_month</span>
                    </label>
                    <input id="year" className={elementClass} style={elementStyle} type="text" placeholder="Year" required></input>
                </div>

                <div className={styles.formInput}>
                    <label for="manufacturer">
                        <span className="input-icon material-icons">factory</span>
                    </label>
                    <div>
                    <select
                        id="manufacturer"
                        className={elementClass} style={elementStyle}
                        value={selectedManufacturer}
                        onChange={(e) => handleManufacturerChange(e.target.value)}
                    >
                        <option>Select Manufacturer</option>
                            {Object.keys(carManufacturers).map((manufacturer) => (
                         <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <div className={styles.formInput}>
                    <label for="model">
                        <span className="input-icon material-icons">directions_car</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={elementStyle}
                        id="model"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option>Select Model</option>
                        {models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <div className={styles.formInput}>
                    <label for="country">
                        <span className="input-icon material-icons">public</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={elementStyle}
                        id="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option>Select Country</option>
                        {gccCountries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    </div>
                </div>
                {selectedCountry === 'UAE' && (
                    <div>
                    <div className={styles.formInput}>
                    <label for="emirate">
                        <span className="input-icon material-icons">public</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={elementStyle}
                        id="emirate"
                        value={selectedEmirate}
                        onChange={(e) => setSelectedEmirate(e.target.value)}
                    >
                        <option>Select Emirate</option>
                        {uaeEmirates.map((emirate) => (
                            <option key={emirate} value={emirate}>{emirate}</option>
                        ))}
                    </select>
                    </div>
                </div>
                </div>)}

                {selectedCountry === 'Saudi Arabia' && (
                    <div className={styles.inputRow}>
                        <div className={styles.formInput}>
                            <label for="numbers">
                                <span className="input-icon material-icons">pin</span>
                            </label>
                            <input id="numbers" className={elementClass} type="text" placeholder="Number" style={plateNumbersStyle} required></input>
                        </div>

                        {[1, 2, 3].map((num) => (
                    <div key={num} className={styles.formInput + ' w-full'}>
                    <div>
                    <select
                    className={elementClass} style={codeStyle}
                    >
                      <option>-</option>
                      {letters.map((letter) => (
                        <option key={letter}>{letter}</option>
                      ))}
                    </select>
                    </div>
                  </div>
                    ))}

                    
                    </div>
                )}

                {(selectedCountry === 'Qatar' || selectedCountry === 'Bahrain') && (
                        <div className={styles.formInput}>
                            <label for="plateNumber">
                                <span className="input-icon material-icons">pin</span>
                            </label>
                            <input id="plateNumber" className={elementClass} style={elementStyle} type="text" placeholder="plateNumber" required></input>
                        </div>
                    
                )}


                {selectedCountry === 'UAE' && (selectedEmirate === 'Dubai' || selectedEmirate === 'Ajman' || selectedEmirate === 'Umm Al-Quwain' || selectedEmirate === 'Fujairah' || selectedEmirate === 'Ras Al Khaimah') && (
                    <div className={styles.inputRow}>
                    <div className={styles.formInput}>
                    <label for="plateCode">
                        <span className="input-icon material-icons">explicit</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={codeStyle}
                        id="plateCode"
                    >
                        <option>Code</option>
                        {dubaiPlateCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    </div>
                    </div>
                    <label for="plateNumber">
                            </label>
                            <input id="plateNumber" className={elementClass} style={plateNumbersStyle} type="text" placeholder="Number" required></input>
                    

                    
                    </div>
                )}
                

                {selectedCountry === 'UAE' && (selectedEmirate === 'Abu Dhabi' || selectedEmirate === 'Sharjah') && (
                    <div className={styles.inputRow}>
                    <div className={styles.formInput}>
                    <label for="plateCode">
                        <span className="input-icon material-icons">explicit</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={codeStyle}
                        id="plateCode"
                    >
                        <option>Code</option>
                        {abuDhabiPlateCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    </div>
                    </div>
                    <label for="plateNumber">
                            </label>
                            <input id="plateNumber" className={elementClass} style={plateNumbersStyle} type="text" placeholder="Number" required></input>
                    

                    
                    </div>
                )}

                {selectedCountry === 'Kuwait' && (
                    <div className={styles.formInput}>
                    <label for="plateCode">
                        <span className="input-icon material-icons">explicit</span>
                    </label>
                    <div>
                    <select
                        className={elementClass} style={codeStyle}
                        id="plateCode"
                    >
                        <option>Code</option>
                        {kuwaitPlateCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    </div>
                    <label for="plateNumber">
                            </label>
                            <input id="plateNumber" className={elementClass} style={elementStyle} type="text" placeholder="plateNumber" required></input>
                    

                    </div>
                )}
                {selectedCountry === 'Oman' && (
                    <div className={styles.inputRow}>
                    <div className={styles.formInput}>
                        <label for="numbers">
                            <span className="input-icon material-icons">pin</span>
                        </label>
                        <input id="numbers" className={elementClass} type="text" placeholder="Number" style={plateNumbersStyle} required></input>
                          </div>

                    {[1, 2].map((num) => (
                <div key={num} className={styles.formInput + ' w-full'}>
                <div>
                <select
                className={elementClass} style={codeStyle}>
                  <option>-</option>
                  {omanPlateLetters.map((letter) => (
                    <option key={letter}>{letter}</option>
                  ))}
                </select>
                </div>
              </div>
                ))}

                
                </div>
                )}
                
            </div>

            <button id="addCarButton" className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.addCarButton}`}>Add Car</button>
             
                
            
             </div>
        
        

    )
}

export default CarRegistrationPage;