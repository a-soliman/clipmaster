const  { app, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;

app.on('ready' , () => {
  tray = new Tray(path.join(__dirname, '/Icon.png'));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    { label: 'Quit', click() { app.quit(); } }
  ]);

  tray.setToolTip('Clipmaster');
  tray.setContextMenu(menu);
});