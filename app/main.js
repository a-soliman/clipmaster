const { globalShortcut, Menu } = require('electron');
const Menubar = require('menubar');

const menubar = Menubar({
  preloadWindow: true,
  index: `file://${__dirname}/index.html`
});

menubar.on('ready', () => {
  console.log('application is ready');
  menubar.showWindow();

  menubar.tray.on('right-click', () => {
    menubar.tray.popUpContextMenu(secondaryMenu);
  });

  const createClipping = globalShortcut.register('CommandOrControl+!', () => {
    menubar.window.webContents.send('create-new-clipping');
  });

  const writeClipping = globalShortcut.register('CmdOrCtrl+Alt+@', () => {
    menubar.window.webContents.send('write-to-clipboard');
  });

  if (!createClipping) {
    console.error('Registration Failed ', 'createClipping');
  }

  if (!writeClipping) {
    console.error('Rigistration Failed ', 'writeClipping');
  }
});

const secondaryMenu = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click() {
      menubar.app.quit();
    },
    accelerator: 'CommanOrControl+Q'
  }
]);
