const { clipboard } = require('electron');

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

copyFromClipboardButton.addEventListener('click', addClippingToList);

const addClippingToList = () => {
  const clippingText = clipboard.readText;
  const clippingElement = createClippingElement(clippingText);
  clippingsList.prepend(clippingElement);
};

const createClippingElement = (clippingText) => {
  const clippingElement = document.createElement('article');

  clippingElement.classList.add('clippings-list-item');
  clippingElement.innerHTM = `
    <div class='clipping-text' disabled='true'></div>
    <div class='clipping-control'>
      <button class='copy-clipping'>&arr; Clipboard</button>
      <button class='publish-clipping'>Publish</button>
      <button class=''remove-clipping>Remove</div>
    </div>
  `;
  clippingElement.querySelector('.clipping-text').innerText = clippingText;

  return clippingElement;
};