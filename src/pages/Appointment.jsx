// import React, { useState, useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import axiosClient from "../axiosClient";
// import { useUser } from "../context/UserContext";
// import RelatedDoctors from "../components/RelatedDoctors";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors } = useContext(AppContext);
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const { userId } = useUser(); // Lấy userId từ context
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

//   // Lấy thông tin bác sĩ
//   const fetchDocInfo = async () => {
//     const doctor = doctors.find((doc) => doc._id === docId);
//     if (doctor) {
//       setDocInfo(doctor);
//     } else {
//       console.error("Doctor not found!");
//     }
//   };

//   // Tạo các khung giờ đặt lịch
//   const getAvailableSlots = () => {
//     const today = new Date();
//     const slots = [];

//     for (let i = 0; i < 7; i++) {
//       const currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       const startTime = new Date(currentDate);
//       startTime.setHours(9, 0, 0, 0);

//       const endTime = new Date(currentDate);
//       endTime.setHours(17, 0, 0, 0);

//       const daySlots = [];
//       while (startTime < endTime) {
//         const formattedTime = startTime.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         const nextTime = new Date(startTime);
//         nextTime.setMinutes(startTime.getMinutes() + 60);

//         const formattedNextTime = nextTime.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         daySlots.push({
//           dateTime: new Date(startTime),
//           time: `${formattedTime} - ${formattedNextTime}`,
//         });

//         startTime.setMinutes(startTime.getMinutes() + 60);
//       }

//       slots.push(daySlots);
//     }

//     setDocSlots(slots);
//   };

//   // Đặt lịch hẹn
//   const bookAppointment = async () => {
//     if (selectedSlotIndex === null) {
//       alert("Please select a time slot.");
//       return;
//     }

//     const selectedSlot = docSlots[slotIndex][selectedSlotIndex];
//     const appointmentData = {
//       doctorId: docInfo._id,
//       doctorName: docInfo.name,
//       date: selectedSlot.dateTime.toISOString(),
//       time: selectedSlot.time,
//       patientId: userId,
//     };

//     try {
//       const response = await axiosClient.post("/appointments", appointmentData);
//       console.log("Appointment booked successfully:", response);
//       alert("Your appointment has been booked!");
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       alert("Failed to book appointment. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (doctors.length > 0) {
//       fetchDocInfo();
//     }
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   if (!docInfo) {
//     return <div>Loading doctor information...</div>;
//   }

//   return (
//     <div>
//       {/* Doctor Details */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary w-full sm:max-w-72 rounded-lg"
//             src={docInfo.image}
//             alt={docInfo.name}
//           />
//         </div>
//         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//             {docInfo.name}
//             <img className="w-5" src={assets.verified_icon} alt="" />
//           </p>
//           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//             <p>
//               {docInfo.degree} - {docInfo.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full">
//               {docInfo.experience}
//             </button>
//           </div>
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//               {docInfo.about}
//             </p>
//           </div>
//           <p className="text-gray-500 font-medium mt-4">
//             Appointment fee:{" "}
//             <span className="text-gray-600">${docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//         <p>Booking slots</p>
//         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//           {docSlots.length > 0 &&
//             docSlots.map((daySlots, index) => (
//               <div
//                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                   slotIndex === index
//                     ? `bg-primary text-white`
//                     : `border border-gray-200`
//                 }`}
//                 key={index}
//                 onClick={() => setSlotIndex(index)}
//               >
//                 <p>{daysOfWeek[daySlots[0]?.dateTime.getDay()]}</p>
//                 <p>{daySlots[0]?.dateTime.getDate()}</p>
//               </div>
//             ))}
//         </div>
//         <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//           {docSlots[slotIndex]?.map((item, index) => (
//             <p
//               key={index}
//               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                 selectedSlotIndex === index
//                   ? `bg-primary text-white`
//                   : `text-gray-400 border border-gray-300`
//               }`}
//               onClick={() => setSelectedSlotIndex(index)}
//             >
//               {item.time?.toLowerCase()}
//             </p>
//           ))}
//         </div>
//         <button
//           onClick={bookAppointment}
//           className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
//         >
//           Book an appointment
//         </button>
//       </div>

//       {/* Related Doctors */}
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//     </div>
//   );
// };

// export default Appointment;


import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axiosClient from "../axiosClient";
import { useUser } from "../context/UserContext";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { userId } = useUser(); // Lấy userId từ context
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const timeSlotMapping = {
    T1: "07:00 AM - 08:00 AM",
    T2: "08:00 AM - 09:00 AM",
    T3: "09:00 AM - 10:00 AM",
    T4: "10:00 AM - 11:00 AM",
    T5: "01:00 PM - 02:00 PM",
    T6: "02:00 PM - 03:00 PM",
    T7: "03:00 PM - 04:00 PM",
    T8: "04:00 PM - 05:00 PM",
  };

  // Lấy thông tin bác sĩ
  const fetchDocInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) {
      setDocInfo(doctor);
    } else {
      console.error("Doctor not found!");
    }
  };

  // Lấy lịch hẹn từ API
  const fetchAvailableSlots = async () => {
    try {
      const response = await axiosClient.get(
        `http://localhost:5000/api/doctor-calendar-free?doctorId=${docId}`
      );
      const data = response.data; // Assuming the response data is structured like the example you provided
      console.log(data)
      const slots = Object.keys(data).map((dateString) => {
        const daySlots = data[dateString].map((slotKey) => {
          return {
            time: timeSlotMapping[slotKey], // Map slot to time range
            dateTime: new Date(dateString), // Convert date string to Date object
          };
        });
        return daySlots;
      });

      setDocSlots(slots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  // Đặt lịch hẹn
  const bookAppointment = async () => {
    if (selectedSlotIndex === null) {
      alert("Please select a time slot.");
      return;
    }

    const selectedSlot = docSlots[slotIndex][selectedSlotIndex];
    const appointmentData = {
      doctorId: docInfo._id,
      doctorName: docInfo.name,
      date: selectedSlot.dateTime.toISOString(),
      time: selectedSlot.time,
      patientId: userId,
    };

    try {
      const response = await axiosClient.post("/appointments", appointmentData);
      console.log("Appointment booked successfully:", response);
      alert("Your appointment has been booked!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      fetchAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <div>Loading doctor information...</div>;
  }

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">${docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => (
              <div
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? `bg-primary text-white`
                    : `border border-gray-200`
                }`}
                key={index}
                onClick={() => setSlotIndex(index)}
              >
                <p>{daysOfWeek[new Date(daySlots[0]?.dateTime).getDay()]}</p>
                <p>{new Date(daySlots[0]?.dateTime).getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                selectedSlotIndex === index
                  ? `bg-primary text-white`
                  : `text-gray-400 border border-gray-300`
              }`}
              onClick={() => setSelectedSlotIndex(index)}
            >
              {item.time?.toLowerCase()}
            </p>
          ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
