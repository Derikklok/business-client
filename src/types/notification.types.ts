export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Document Created',
    message: 'Invoice #INV-001 has been created for David Pieris (Pvt) Ltd',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of LKR 25,000 received for Invoice #INV-002',
    type: 'success',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
  },
  {
    id: '3',
    title: 'Cloud Backup Complete',
    message: 'All documents have been successfully backed up to the cloud',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: '4',
    title: 'New Customer Added',
    message: 'Hemas Pvt Ltd has been added to your customer database',
    type: 'info',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
  {
    id: '5',
    title: 'System Update',
    message: 'New features have been added to the document management system',
    type: 'info',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
];