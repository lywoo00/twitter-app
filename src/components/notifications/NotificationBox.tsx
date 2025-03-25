import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { Notificationprops } from "pages/notifications";
import { useNavigate } from "react-router-dom";
import styles from "./Notification.module.scss";

const NotificationBox = ({
  notification,
}: {
  notification: Notificationprops;
}) => {
  const navigate = useNavigate();
  const onClickNotification = async (url: string) => {
    const isReadRef = doc(db, "notifications", notification.id);
    await updateDoc(isReadRef, {
      isRead: true,
    });
    navigate(url);
  };
  return (
    <div className={styles.notification}>
      <div onClick={() => onClickNotification(notification?.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createAt}>
            {notification.createAt}
          </div>
          {!notification.isRead && (
            <div className={styles.notification_unread}>
              <span className="blind">안읽음</span>
            </div>
          )}
        </div>
        <div className={styles.notification__content}>
          {notification.content}
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
