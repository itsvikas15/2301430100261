import { useEffect, useState } from "react";
import axios from "axios";
import NotificationCard from "../components/NotificationCard";

function AllNotifications() {

  const [notifications, setNotifications] = useState([]);

  const token = "YOUR_TOKEN";

  useEffect(() => {

    axios.get(
      "http://4.224.186.213/evaluation-service/notifications?page=1&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setNotifications(res.data.notifications);
    })
    .catch(err => {
      console.log(err);
    });

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Notifications</h1>

      {notifications.map(item => (
        <NotificationCard
          key={item.ID}
          notification={item}
        />
      ))}
    </div>
  );
}

export default AllNotifications;