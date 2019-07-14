const Menubar = require('menubar');
const menubar = Menubar();

menubar.on('ready', () => {
  console.log('application is ready');
});

menubar.on('after-create-window', () => {
  menubar.window.loadURL(`file://${__dirname}/index.html`);
});




// const  { app, Tray, Menu, systemPreferences, clipboard, globalShortcut, BrowserWindow } = require('electron');
// const path = require('path');

// let browserWindow = null;
// const clippings  = [];
// let tray = null;

// const getIcon = () => {
//   if (process.platform === 'win32') return 'icon-light2x.ico';
//   if (systemPreferences.isDarkMode()) return 'icon-light.png';
//   return 'icon-dark.png';
// };

// app.on('ready' , () => {
//   if (app.dock) app.dock.hide();
//   tray = new Tray(path.join(__dirname, getIcon()));
//   tray.setPressedImage(path.join(__dirname, 'icon-light.png'));

//   if (process.platform === 'win32') {
//     tray.on('click', tray.popUpContextMenu);
//   }

//   browserWindow = new BrowserWindow({
//     show: false
//   });

//   browserWindow.loadURL(`file://${__dirname}/index.html`);

//   const activationShortcut = globalShortcut.register(
//     'CommandOrControl+Option+C', () => {
//       tray.popUpContextMenu();
//     }
//   );

//   if (!activationShortcut) {
//     console.error('Global activation shortcut failed to register.');
//   }

//   const newClippingShortcut = globalShortcut.register(
//     'CommandOrControl+Shift+Option+C', () => {
//       const clipping = addClipping();
//       browserWindow.webContents.send(
//         'show-notification',
//         'Clipping Added',
//         clipping
//       );
//     }
//   );

//   if (!newClippingShortcut) {
//     console.log('Global new clipping shortcut failed to register.');
//   }

//   updateMenu();
//   tray.setToolTip('Clipmaster');
// });

// const updateMenu = () => {
//   const menu = Menu.buildFromTemplate([
//     {
//       label: 'Create New Clipping',
//       click() { addClipping(); } ,
//       accelerator: 'CommandOrControl+shift+C'
//     },
//     { type: 'separator' },
//     ...clippings.slice(0, 10).map(createClippingMenuItem),
//     { type: 'separator' },
//     {
//       label: 'Quit',
//       click() { app.quit(); },
//       accelerator: 'CommandOrControl+Q'
//     }
//   ]);
//   tray.setContextMenu(menu);
// };

// const createClippingMenuItem = (clipping, index) => {
//   return {
//     label: clipping,
//     accelerator: `CommandOrControl+${index}`,
//     click() { writeClipping(clipping); }
//   };
// };

// const addClipping = () => {
//   const clipping = clipboard.readText();
//   if(clipping !== clippings[clippings.length -1]) {
//     clippings.push(clipping);
//     updateMenu();
//   }
//   return clipping;
// };

// const writeClipping = (clipping) => {
//   clipboard.writeText(clipping);
// };