import React from "react";

const Dashboard = () => {
  const bookings = [
    { name: "Dr. Richard James", date: "26 Sep 2024", status: "Cancelled" },
    { name: "Dr. Christopher Davis", date: "23 Sep 2024", status: "Completed" },
    { name: "Dr. Richard James", date: "25 Sep 2024", status: "Completed" },
    { name: "Dr. Emily Larson", date: "22 Sep 2024", status: "Completed" },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 text-blue-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">15</h2>
          <p>Doctors</p>
        </div>
        <div className="bg-purple-100 text-purple-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">5</h2>
          <p>Appointments</p>
        </div>
        <div className="bg-green-100 text-green-800 p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-bold">3</h2>
          <p>Patients</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Latest Bookings</h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-bold">{booking.name}</p>
                <p className="text-sm text-gray-600">Booking on {booking.date}</p>
              </div>
              <span
                className={`${
                  booking.status === "Cancelled"
                    ? "text-red-500"
                    : "text-green-500"
                } font-bold`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
