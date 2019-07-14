const { clipboard, ipcRenderer } = require('electron');

ipcRenderer.on('create-new-clipping', () => {
  addClippingToList();
  new Notification('Clipping Added', { body: clipboard.readText() });
});

ipcRenderer.on('write-to-clipboard', () => {
  const clipping = clippingsList.firstChild();
  writeToClipboard(getClippingText(clipping));
  new Notification('Clippng Wrote', { body: getClippingText(clipping) });
});

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

const addClippingToList = () => {
  const clippingText = clipboard.readText();
  const clippingElement = createClippingElement(clippingText);
  clippingsList.prepend(clippingElement);
};

const createClippingElement = clippingText => {
  const clippingElement = document.createElement('article');

  clippingElement.classList.add('clippings-list-item');
  clippingElement.innerHTML = `
    <div class='clipping-text' disabled='true'></div>
    <div class='clipping-control'>
      <button class='copy-clipping'>&rarr; Clipboard</button>
      <button class='publish-clipping'>Publish</button>
      <button class='remove-clipping'>Remove</button>
    </div>
  `;
  clippingElement.querySelector('.clipping-text').innerText = clippingText;

  return clippingElement;
};

const getButtonParent = ({ target }) => {
  return target.parentNode.parentNode;
};

const getClippingText = clippingListItem => {
  return clippingListItem.querySelector('.clipping-text').innerText;
};

const removeClipping = target => {
  target.remove();
};

const writeToClipboard = text => {
  clipboard.writeText(text);
};

clippingsList.addEventListener('click', evt => {
  const hasClass = className => {
    return evt.target.classList.contains(className);
  };

  const clippingListItem = getButtonParent(evt);
  const clippingText = getClippingText(clippingListItem);

  if (hasClass('remove-clipping')) removeClipping(clippingListItem);
  if (hasClass('publish-clipping')) writeToClipboard(clippingText);
  if (hasClass('copy-clipping')) alert(clippingText);
});

copyFromClipboardButton.addEventListener('click', addClippingToList);
