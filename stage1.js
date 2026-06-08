const axios = require("axios");

// Apna NEW access token yahan paste karo
const token = "YOUR_ACCESS_TOKEN_HERE";

// Priority Mapping
const PRIORITY = {
    Placement: 3,
    Result: 2,
    Event: 1
};

async function getTopNotifications() {
    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2aWthc21hdXJ5YTk1MDZAZ21haWwuY29tIiwiZXhwIjoxNzgwOTA1MTE5LCJpYXQiOjE3ODA5MDQyMTksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4ZjdiYTY2ZS1kNjcyLTRhNWUtOTdmNS1iODVhOTM1ODkyYzkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2aWthcyBtYXVyeWEiLCJzdWIiOiJhNTU1ODhlYi0zZGU5LTRmOTktOTcyYi0xMDUwYjI1YzcyZDAifSwiZW1haWwiOiJ2aWthc21hdXJ5YTk1MDZAZ21haWwuY29tIiwibmFtZSI6InZpa2FzIG1hdXJ5YSIsInJvbGxObyI6IjIzMDE0MzAxMDAyNjEiLCJhY2Nlc3NDb2RlIjoibnlYUU11IiwiY2xpZW50SUQiOiJhNTU1ODhlYi0zZGU5LTRmOTktOTcyYi0xMDUwYjI1YzcyZDAiLCJjbGllbnRTZWNyZXQiOiJzdVpUV2pSbkFtR01kdXNQIn0.iKG_aZjkrfb4WW5qa523vvU2sR3OE77ieK9fLU4A1So"}`
                }
            }
        );

        const notifications = response.data.notifications;

        const rankedNotifications = notifications
            .map(notification => ({
                ...notification,
                priority: PRIORITY[notification.Type] || 0
            }))
            .sort((a, b) => {

                // Higher priority first
                if (b.priority !== a.priority) {
                    return b.priority - a.priority;
                }

                // Latest notification first
                return new Date(b.Timestamp) - new Date(a.Timestamp);
            });

        const top10Notifications = rankedNotifications.slice(0, 10);

        console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

        console.table(
            top10Notifications.map(item => ({
                ID: item.ID,
                Type: item.Type,
                Message: item.Message,
                Timestamp: item.Timestamp
            }))
        );

    } catch (error) {

        console.log("\nERROR OCCURRED\n");

        if (error.response) {
            console.log("Status Code:", error.response.status);
            console.log("Response:", error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

getTopNotifications();