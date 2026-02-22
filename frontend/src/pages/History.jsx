import { useEffect, useState } from "react";
import api from "../api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/api/history/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h2>Past Analyses</h2>
      {history.map(item => (
        <div key={item.id}>
          <p>Date: {item.created_at}</p>
          <p>Score: {item.match_score}%</p>
        </div>
      ))}
    </div>
  );
}

export default History;
