const assert = require('assert');
const path = require('path');
const Application = require('spectron').Application;
const electronPath = require('electron');

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')],
  webdriverOptions: {
    deprecationWarnings: false
  }
});

const openApp = new Promise((resolve) => {
  app.start();
  setTimeout(() => {
    console.log('Now')
    resolve();
  }, 5000);
});

describe('Clipmaster', function() {
  this.timeout(10000);

  beforeEach(function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        app.start();
        // console.log('Now');
        resolve();
      }, 1000);
    });
  });

  afterEach(function() {
    if (app && app.isRunning()) {
      app.stop();
    }
  });

  it('shows an initial window', async () => {
    const count = await app.client.getWindowCount();
    return assert.equal(count, 1);

  });

  it('has the correct title', async() => {
    const title = await app.client.waitUntilWindowLoaded().getTitle();
    return assert.equal(title, 'Clipmasterd');
  });
});


