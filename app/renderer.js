const { clipboard } = require('electron');

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

const addClippingToList = () => {
  const clippingText = clipboard.readText();
  const clippingElement = createClippingElement(clippingText);
  clippingsList.prepend(clippingElement);
};

const createClippingElement = (clippingText) => {
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

const removeClipping = target => {
  target.parentNode.parentNode.remove();
};

clippingsList.addEventListener('click', (evt) => {
  const hasClass = className => {
    return evt.target.classList.contains(className);
  };

  if (hasClass('remove-clipping')) removeClipping(evt.target);
  if (hasClass('publish-clipping')) alert('Publish clipping');
  if (hasClass('copy-clipping')) alert('Copy clipping');
});
copyFromClipboardButton.addEventListener('click', addClippingToList);