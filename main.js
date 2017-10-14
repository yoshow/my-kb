const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // 在 App 中加载默认页面
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 初始化菜单
// var webview = document.getElementById('webview');
var Menu = electron.Menu;

function loadUrl(url) {
  return function () {
    console.log('url:' + url);
    mainWindow.loadURL(url);
  }
}

// 开发者工具
let devToolsStatus = 0;

var template = [
  {
    label: '程序',
    submenu: [
      {
        label: '重启',
        click: loadUrl('http://www.youku.com')
      },
      {
        type: 'separator'
      },
      {
        label: '退出',
        click: () => {
          app.quit();
        }
      }

    ]
  },
  {
    label: '设置',
    submenu: [
      {
        label: '系统环境',
        click: () => {
          let win = new BrowserWindow({ width: 400, height: 300, autoHideMenuBar: true, transparent: true, frame: true })

          win.loadURL(url.format({
            pathname: path.join(__dirname, 'static/files/sys-env.html'),
            protocol: 'file:',
            slashes: true
          }));

          win.webContents.toggleDevTools();
          win.show();
        }
      },
      {
        label: '系统参数',
        click: () => {
          let win = new BrowserWindow({ width: 400, height: 300, autoHideMenuBar: true, transparent: true, frame: true })

          win.loadURL(url.format({
            pathname: path.join(__dirname, 'static/files/sys-variables.html'),
            protocol: 'file:',
            slashes: true
          }));

          // win.webContents.toggleDevTools();
          // win.show();
          electron.dialog.showOpenDialog(win);
        }
      },
      {
        type: 'separator'
      },
      {
        label: '调试',
        click: () => {
          if (devToolsStatus == 1) {
            mainWindow.webContents.closeDevTools();
            devToolsStatus = 0;
          }
          else {
            mainWindow.webContents.openDevTools();
            devToolsStatus = 1;
          }
        }
      }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);

