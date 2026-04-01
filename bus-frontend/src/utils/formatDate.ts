export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).format(date);
};

export const formatTime = (timeStr: string) => {
  if (!timeStr) return '';
  // assumes format like "14:30" or ISO
  if (timeStr.includes('T')) {
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return timeStr;
};
