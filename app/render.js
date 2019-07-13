const { ipcRenderer } = require('electron');

ipcRenderer.on('show-notification', (evt, title, body) => {
  const myNotification = new Notification(title, { body });
});