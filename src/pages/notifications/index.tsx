import NotificationBox from "components/notifications/NotificationBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";

export interface Notificationprops {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createAt: string;
}
const NotificationsPage = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<Notificationprops[]>([]);

  useEffect(() => {
    if (user) {
      const ref = collection(db, "notifications");
      const notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createAt", "desc")
      );

      onSnapshot(notificationQuery, (snapShot) => {
        const dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotifications(dataObj as Notificationprops[]);
      });
    }
  }, [user]);
  console.log("norifications", notifications);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Notification</div>
      </div>
      <div className="post">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationBox
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div>알림이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
