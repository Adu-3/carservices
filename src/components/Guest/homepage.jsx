import path from '../../assets/Guest/path.png';
import light from '../../assets/Guest/light.png';
import shield from '../../assets/Guest/shield.png';
import traffic from '../../assets/Guest/traffic.png';
import tolls from '../../assets/Guest/tolls.png';

function HomePage() {
  return (
    <div>
      <div className="flex flex-col bg-black w-screen min-h-screen">
        {/* Hero Section */}
        <div
          className="bg-cover bg-center w-screen flex flex-col md:flex-row bg-[url('../../assets/Guest/light.png')]"
          style={{ backgroundImage: `url(${light})` }}
        >
          {/* Image - on top in mobile, left in desktop */}
          <img
            src={path}
            alt="path"
            className="w-full md:w-200 md:h-auto  "
          />

          {/* Text + Buttons */}
          <div className="flex flex-col justify-center items-center md:items-start md:self-center p-4">
            <p className="text-white text-4xl md:text-7xl font-bold text-center md:text-left">
              Do Your Car Services
            </p>
            <p className="text-white text-4xl md:text-7xl font-bold mt-4 md:mt-5 text-center md:text-left">
              Where Ever You Go
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center md:items-start">
              <button
                className="text-white font-bold rounded-full border-2 text-lg md:text-xl text-center py-3 px-6"
                style={{
                  background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)',
                }}
              >
                Create Account
              </button>
              <button className="bg-black text-white font-bold rounded-full border-2 text-lg md:text-xl text-center py-3 px-6">
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="Features" className="mt-10 px-4 flex flex-col">
          <p className="text-white font-bold text-3xl self-center">Our Features</p>
          <span
            className="w-32 h-1 self-center rounded mt-2"
            style={{
              background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)',
            }}
          ></span>
          <div
            id="FeaturesBlock"
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl self-center w-full"
          >
            <div className="border border-white rounded-3xl p-6 flex flex-col items-center text-center bg-black">
              <img src={shield} alt="Insurance Guarantee" className="h-20 mb-4" />
              <p className="text-white text-2xl font-bold">Protect Your Car</p>
              <p className="mt-4 text-gray-300">
                Ensure your car with multiple options from insurance companies in different countries.
              </p>
            </div>

            <div className="border border-white rounded-3xl p-6 flex flex-col items-center text-center bg-black">
              <img src={traffic} alt="Settle Violations" className="h-20 mb-4" />
              <p className="text-white text-2xl font-bold">Settle Your Violations</p>
              <p className="mt-4 text-gray-300">
                Resolve traffic violations quickly and securely, with support from various local and international authorities.
              </p>
            </div>

            <div className="border border-white rounded-3xl p-6 flex flex-col items-center text-center bg-black">
              <img src={tolls} alt="Pay Tolls" className="h-20 mb-4" />
              <p className="text-white text-2xl font-bold">Pay Tolls</p>
              <p className="mt-4 text-gray-300">
                Easily manage and pay toll charges across different regions with seamless payment options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
