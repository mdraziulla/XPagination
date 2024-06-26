import { useEffect, useState } from "react";
import axios from "axios";

function XPagination() {
    const [data, setData] = useState([]);
  const [page, SetPage] = useState(1);
  const handleNext = () => {
    const pages = Math.ceil(data.length / 10);
    if (page < pages) {
      SetPage((page) => page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      SetPage((page) => page - 1);
    }
  };
  const pagination = () => {
    const start = (page - 1) * 10;
    const end = page * 10;
    return data.slice(start, end);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(res.data);
    } catch (error) {
      alert("failed to fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = pagination();
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Employee Data Table</h1>
      <table style={{ textAlign: "left" }}>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button onClick={handlePrev}>Previous</button>
        <p>{page}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default XPagination
