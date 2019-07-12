const  { app, Tray, Menu, systemPreferences } = require('electron');
const path = require('path');

let tray = null;

app.on('ready' , () => {
  if (app.dock) app.dock.hide();
  tray = new Tray(path.join(__dirname, getIcon()));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    { label: 'Quit', click() { app.quit(); } }
  ]);

  tray.setToolTip('Clipmaster');
  tray.setContextMenu(menu);

});

const getIcon = () => {
  if (process.platform === 'win32') return 'icon-light2x.ico';
  if (systemPreferences.isDarkMode()) return 'icon-light.png';
  return 'icon-dark.png';
};