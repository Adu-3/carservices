import path from '../../assets/Guest/path.png';
import light from '../../assets/Guest/light.png';

function HomePageA() {
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
              <span className="material-icons" style={{ fontSize: '4rem', 
                background: 'linear-gradient(to top left, #00FFCC, #0095FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent' }}>person
              </span>
              <br></br>
              <p className="text-white text-2xl font-bold">Manage Users & Vehicles</p>
              <p className="mt-4 text-gray-300">
              View, edit, and manage all users and their registered cars.
              </p>
            </div>

            <div className="border border-white rounded-3xl p-6 flex flex-col items-center text-center bg-black">
            <span className="material-icons" style={{ fontSize: '4rem', 
                background: 'linear-gradient(to top left, #00FFCC, #0095FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent' }}>check
              </span>
              <br></br>
              <p className="text-white text-2xl font-bold">Create Service Providers</p>
              <p className="mt-4 text-gray-300">
              Add or manage service providers like insurance companies and toll companies.
              </p>
            </div>

            <div className="border border-white rounded-3xl p-6 flex flex-col items-center text-center bg-black">
            <span className="material-icons" style={{ fontSize: '4rem', 
                background: 'linear-gradient(to top left, #00FFCC, #0095FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent' }}>note
              </span>
              <br></br>
              <p className="text-white text-2xl font-bold">View User Forms</p>
              <p className="mt-4 text-gray-300">
              Access and review forms submitted by users to ensure best user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageA;
