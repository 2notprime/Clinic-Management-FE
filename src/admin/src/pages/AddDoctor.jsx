import React from "react";

const AddDoctor = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main Content */}
      <main className="flex-1 bg-white p-10">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload doctor picture
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speciality
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>General Physician</option>
                  <option>Gynecologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatricians</option>
                  <option>Neurologist</option>
                  <option>Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  placeholder="Education"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  placeholder="Experience"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees
                </label>
                <input
                  type="text"
                  placeholder="Your fees"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address 1"
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                <input
                  type="text"
                  placeholder="Address 2"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                placeholder="Write about yourself"
                className="w-full border border-gray-300 rounded-md p-2"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDoctor;
