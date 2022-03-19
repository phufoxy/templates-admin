export const variables = {
  STATUS: {
    PENDING: 'PENDING',
    CONFIRM: 'CONFIRM',
    CANCEL: 'CANCEL',
    ON: 'ON',
    OFF: 'OFF',
  },
  STATUS_NAME: {
    PENDING: 'Chờ xác nhận',
    CONFIRM: 'Đã xác nhận',
    CANCEL: 'Đã từ chối',
    ON: 'Đang hoạt động',
    OFF: 'Dừng hoạt động',
  },
  ARRAY_STATUS: [
    { id: 'ON', name: 'Đang hoạt động' },
    { id: 'OFF', name: 'Dừng hoạt động' },
  ],
  ARRAY_STATUS_ADMIN: [
    { id: 'PENDING', name: 'Chờ xác nhận' },
    { id: 'CONFIRM', name: 'Đã xác nhận' },
  ],
};

export default variables;
