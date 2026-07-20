export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase();
};

export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const generateRandomColor = () => {
  const colors = [
    '#4F46E5',
    '#7C3AED',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#EC4899',
    '#14B8A6',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getStatusColor = (status) => {
  const statusColors = {
    active: '#10B981',
    inactive: '#6B7280',
    pending: '#F59E0B',
    completed: '#10B981',
    failed: '#EF4444',
    present: '#10B981',
    absent: '#EF4444',
    late: '#F59E0B',
    excused: '#3B82F6',
  };
  return statusColors[status] || '#6B7280';
};

export const getStatusBgColor = (status) => {
  const statusBgColors = {
    active: '#D1FAE5',
    inactive: '#F3F4F6',
    pending: '#FEF3C7',
    completed: '#D1FAE5',
    failed: '#FEE2E2',
    present: '#D1FAE5',
    absent: '#FEE2E2',
    late: '#FEF3C7',
    excused: '#DBEAFE',
  };
  return statusBgColors[status] || '#F3F4F6';
};
