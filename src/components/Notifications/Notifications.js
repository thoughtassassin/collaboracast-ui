import React from "react";

const Notifications = ({ notificationId, notifications }) => {
  const notification = notifications.filter(
    notification => notification.id === Number(notificationId)
  );
  console.log(notification);
  return <div className="notifications">Notifications</div>;
};

export default Notifications;
