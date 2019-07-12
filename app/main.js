const  { app, Tray, Menu, systemPreferences } = require('electron');
const path = require('path');

const clippings  = [];
let tray = null;

const getIcon = () => {
  if (process.platform === 'win32') return 'icon-light2x.ico';
  if (systemPreferences.isDarkMode()) return 'icon-light.png';
  return 'icon-dark.png';
};

app.on('ready' , () => {
  if (app.dock) app.dock.hide();
  tray = new Tray(path.join(__dirname, getIcon()));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  updateMenu();
  tray.setToolTip('Clipmaster');
});

const updateMenu = () => {
  const menu = Menu.buildFromTemplate([
    { label: 'Create New Clipping', click() { null; } },
    { type: 'separator' },
    ...clippings.map((clipping, index) => ({ label: clipping })),
    { label: 'Quit', click() { app.quit(); } }
  ]);
  tray.setContextMenu(menu);

};