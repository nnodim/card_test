import React from "react";

const AdminForgetPassword = () => {
  return (
    <div className=" font-bricolage ">
      <img
        src="https://cdn.hashnode.com/res/hashnode/image/upload/v1724143689225/3f4cc19d-6a3a-4b05-8679-e05e722ebb70.png"
        alt="Logo"
        className="w-[116px] m-6"
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#7C4CFF0F] p-8 rounded-md shadow-lg w-full max-w-md">
          <div className=" mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Forgot Password
            </h2>
            <p className="text-gray-500 mt-1">
              Kindly create and confirm your password
            </p>
          </div>
          <form>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-inherit"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600">
                Re-enter New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Re-enter new password"
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-inherit"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Create New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForgetPassword;
