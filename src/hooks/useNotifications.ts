import { useState, useCallback } from 'react';
import { mockNotifications, type Notification } from '@/types/notification.types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const sortedNotifications = [...notifications].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return {
    notifications: sortedNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};