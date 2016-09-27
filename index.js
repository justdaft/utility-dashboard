#! /usr/bin/env node

var blessed = require('blessed')
var contrib = require('blessed-contrib')
var screen = blessed.screen()
var fs = require('fs');
var username = require('username');
var uname = ''
username().then(usern => {
    // console.log(username);
    uname = usern;;
    //=> 'sindresorhus' 
});
uname = username.sync();

// var list = blessed.list({
//   parent: screen,
//   label: ' {bold}{cyan-fg}Art List{/cyan-fg}{/bold} (Drag Me) ',
//   tags: true,
//   draggable: true,
//   top: 0,
//   right: 0,
//   height: '50%',
//   keys: true,
//   vi: true,
//   mouse: true,
//   border: 'line'})


var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

//grid.set(row, col, rowSpan, colSpan, obj, opts)
// var map = grid.set(1, 1, 6, 6, contrib.map, {label: 'World Map'})
var box1 = grid.set(0, 0, 5, 5, blessed.box, { label: 'Curent User', content: 'Username: ' + uname })
var box2 = grid.set(5, 0, 5, 5, blessed.box, { content: 'My Box2' })
var box3 = grid.set(0, 5, 5, 5, blessed.box, { content: 'My Box3' })
var box4 = grid.set(5, 5, 5, 5, blessed.box, { content: 'My Box4' })
var box5 = grid.set(10, 0, 2, 12, blessed.box, { label: 'Logs', content:'Directory: ' + __dirname + '/logs' })
var box6 = grid.set(0, 10, 10, 2, blessed.box, { content: 'My Box6' })


screen.render()
// box2.content = blessed.list();

setInterval(function () {
    // generateTable()
    screen.render()
}, 500)
