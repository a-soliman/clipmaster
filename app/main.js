const  { app, Tray, Menu, systemPreferences, clipboard } = require('electron');
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
    {
      label: 'Create New Clipping',
      click() { addClipping(); } ,
      accelerator: 'CommandOrControl+shift+C'
    },
    { type: 'separator' },
    ...clippings.slice(0, 10).map(createClippingMenuItem),
    { type: 'separator' },
    {
      label: 'Quit',
      click() { app.quit(); },
      accelerator: 'CommandOrControl+Q'
    }
  ]);
  tray.setContextMenu(menu);
};

const createClippingMenuItem = (clipping, index) => {
  return {
    label: clipping,
    accelerator: `CommandOrControl+${index}`,
    click() { writeClipping(clipping); }
  };
};

const addClipping = () => {
  const clipping = clipboard.readText();
  if(clipping !== clippings[clippings.length -1]) {
    clippings.push(clipping);
    updateMenu();
  }
  return clipping;
};

const writeClipping = (clipping) => {
  clipboard.writeText(clipping);
};