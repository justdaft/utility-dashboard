#! /usr/bin/env node

var blessed = require('blessed')
var contrib = require('blessed-contrib')
var scan = require('./scan');
var screen = blessed.screen()
var fs = require('fs');
var os = require('os');
var username = require('username');
var uname = ''
var _ = require('lodash');

var osNet = os.networkInterfaces().en0;

var xx = _.pickBy(osNet, {family: 'IPv4'});


var zzz = _.find(xx);

console.log(zzz);

username().then(usern => {
  uname = usern;
});
uname = username.sync();

var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })
var box1 = grid.set(0, 0, 5, 5, blessed.box, { label: 'Curent User' })
var box2 = grid.set(5, 0, 5, 5, blessed.box, { content: 'My Box2' })
var box3 = grid.set(0, 5, 5, 5, blessed.box, { content: 'My Box3' })
var box4 = grid.set(5, 5, 5, 5, blessed.box, { content: 'My Box4' })
var box5 = grid.set(10, 0, 2, 12, blessed.box, { label: 'Logs', content: 'Directory: ' + __dirname + '/logs' })
var box6 = grid.set(0, 10, 10, 2, blessed.box, { content: 'My Box6' })

var log = grid.set(10, 0, 2, 12, contrib.log,
  {
    fg: "green"
    , selectedFg: "green"
    , label: 'Server Log'
  })

var userDataTable = grid.set(0, 0, 5, 5, contrib.table,
  {
    keys: true
    , fg: 'white'
    , selectedFg: 'white'
    , selectedBg: 'blue'
    , interactive: false
    , label: 'Files'
    , width: '30%'
    , height: '30%'
    , border: { type: "line", fg: "cyan" }
    , columnSpacing: 10
    , columnWidth: [100]
  })

var table = grid.set(5, 0, 5, 5, contrib.table,
  {
    keys: true
    , fg: 'white'
    , selectedFg: 'white'
    , selectedBg: 'blue'
    , interactive: false
    , label: 'Files'
    , width: '30%'
    , height: '30%'
    , border: { type: "line", fg: "cyan" }
    , columnSpacing: 10
    , columnWidth: [12]
  })

screen.render()

function generateUserDateTable() {

  var uName = 'Name:' + uname;
  var hostName = 'Hostname: ' + os.hostname();
  var osPlatform = 'Platform: ' + os.platform();
  var osTotalMem = 'Total Memory: ' + os.totalmem();
  var osUptime = 'Uptime: ' + os.uptime();
  var userHomeDir = 'Home Dir: ' + os.homedir();
  var osLoadAvg = 'CPU Average Load: ' + os.loadavg();
  var osNet = 'Net: ' + zzz.mac  + ' IP:' + zzz.address + ' mask: ' + zzz.netmask ;

  userDataTable.setData(
    {
      headers: ['']
      , data: [
        [uName],
        [hostName],
        [osPlatform],
        [osTotalMem],
        [osUptime],
        [userHomeDir],
        [osLoadAvg],
        [osNet]
      ]
    })
}

function generateTable() {
  var data = []
  var tree = scan('./folder_to_watch', 'files');
  for (var i = 0; i < tree.items.length; i++) {
    var row = []
    row.push(tree.items[i].name)
    data.push(row)
  }
  table.setData(
    {
      headers: ['']
      , data: data
    })
}

generateTable();
generateUserDateTable()


table.focus()
screen.append(table)

setInterval(function () {
  generateTable()
  screen.render()
}, 500)

screen.render()
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});


