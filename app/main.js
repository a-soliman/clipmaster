const  { app, Tray, Menu } = require('electron');
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

const getIcon = () => process.platform === 'win32' ? 'icon-light2x.ico' : 'icon-dark.png';