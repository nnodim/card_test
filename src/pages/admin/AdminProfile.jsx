import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const AdminProfile = () => {
  return (
    <main className="h-screen w-full flex">
      <div className="w-[20%] ml-5 my-4">
        <Sidebar />
      </div>

      <section className=" w-[80%] flex flex-col px-10 gap-7">
        <Searchbar />
        <section className="bg-[#7C4CFF] bg-opacity-[6%] px-10 py-8 h-full w-full rounded-md overflow-y-auto mb-4">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-bricolage">
              Profile
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-6 w-[45%]">
              <div className="flex gap-5">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-[#7C4CFF] rounded-full h-20 w-20 flex items-center justify-center text-white text-3xl font-bold">
                    JD
                  </div>
                </div>
                <div className="">
                  <h2 className="text-xl font-semibold mb-2">JOHN DOE S.</h2>
                  <p className="text-gray-500 mb-4">johndoe@gmail.com</p>
                </div>
              </div>
              <p className=" text-right text-[#7C4CFF] mt-10 mb-4">
                Edit Profile
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="JOHN DOE S."
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder="#00001ABCDEF"
                    className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </form>
            </div>
            <div className=" mt-6">
              <button className="bg-[#7C4CFF] text-white py-2 px-4 rounded-full shadow-md hover:bg-purple-600">
                Change Password
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-[45%] mt-10">
              <form className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="mt-1 block w-full px-3 py-4 bg-gray-50 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="mt-1 block w-full px-3 py-4 bg-gray-50 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />

                  <div className=" mt-6 text-right">
                    <button className=" text-[#7C4CFF] py-2 px-4 rounded-full border border-[#7C4CFF]">
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AdminProfile;
