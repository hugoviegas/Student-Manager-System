import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [slots, setSlots] = useState([]);
  if (!token) {
    navigate("/");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // Obter alunos que começam no mês atual
        const studentsResponse = await axios.get(
          "http://localhost:3000/students",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setStudents(studentsResponse.data);

        // Obter vagas disponíveis
        const slotsResponse = await axios.get("http://localhost:3000/slots", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setSlots(slotsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Alunos que começam neste mês</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Vagas Disponíveis</h2>
        <ul>
          {slots.map((slot) => (
            <li key={slot.id}>
              {slot.date} - {slot.shift}: {slot.filled_slots}/{slot.total_slots}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
