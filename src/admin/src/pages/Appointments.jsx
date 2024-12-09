import React from "react";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      patient: "Avinash Kr",
      age: 31,
      date: "5 Oct 2024, 12:00 PM",
      doctor: "Dr. Richard James",
      fees: "$50",
      status: "Cancelled",
    },
    {
      id: 2,
      patient: "GreatStack",
      age: 24,
      date: "26 Sep 2024, 11:00 AM",
      doctor: "Dr. Richard James",
      fees: "$40",
      status: "Cancelled",
    },
    {
      id: 3,
      patient: "GreatStack",
      age: 24,
      date: "23 Sep 2024, 01:00 PM",
      doctor: "Dr. Christopher Davis",
      fees: "$50",
      status: "Cancelled",
    },
    {
      id: 4,
      patient: "GreatStack",
      age: 24,
      date: "25 Sep 2024, 02:00 PM",
      doctor: "Dr. Richard James",
      fees: "$40",
      status: "Completed",
    },
    {
      id: 5,
      patient: "GreatStack",
      age: 24,
      date: "23 Sep 2024, 11:00 AM",
      doctor: "Dr. Richard James",
      fees: "$40",
      status: "Completed",
    },
    {
      id: 6,
      patient: "GreatStack",
      age: 24,
      date: "22 Sep 2024, 06:00 PM",
      doctor: "Dr. Emily Larson",
      fees: "$60",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">All Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Date & Time</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="p-4">{appointment.id}</td>
                <td className="p-4 flex items-center">
                  <img
                    src={`https://via.placeholder.com/40`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {appointment.patient}
                </td>
                <td className="p-4">{appointment.age}</td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4">{appointment.fees}</td>
                <td className="p-4">
                  {appointment.status === "Completed" ? (
                    <span className="text-green-500 font-medium">
                      {appointment.status}
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      {appointment.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
