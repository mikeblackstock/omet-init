import './index.scss';
import osjs from 'osjs';
import {name as applicationName} from './metadata.json';

	





// Our launcher
const register = (core, args, options, metadata) => {
 
const proc = core.make('osjs/application', {args, options, metadata});
const notify= (msg) => {
	core.make('osjs/notification', {
	 	message: msg,
	  	onclick: () => console.log('Clicked!')
	});	
};

const sendMessage = (cmd, user) => proc.send(JSON.stringify({
	cmd,
    user
    
 }));
 
let user= core.make('osjs/auth').user().username; 
sendMessage('check', user);
 
proc.on('ws:message', (...args) => {

	notify(args[0]);
	console.log(args[0]);
//	proc.emit('destroy');
}); 
 
 
 
 
//notify("OMET initialized");
  // Create  a new Window instance
/*
  proc.createWindow({
    id: 'InitWindow',
    title: metadata.title.en_EN,
    dimension: {width: 200, height: 200},
    position: {'center'}
  })
    .on('destroy', () => proc.destroy())
	render(($content, win) => {
    // Add our process and window id to iframe URL
    const suffix = `?pid=${proc.pid}&wid=${win.wid}`;

	const container = document.createElement('div');
	container.innerHTML=('Hello World');

    $content.appendChild(container);

  });
*/  
  // Creates a new WebSocket connection (see server.js)
  //const sock = proc.socket('/socket');
  //sock.on('message', (...args) => console.log(args))
  //sock.on('open', () => sock.send('Ping'));

  // Use the internally core bound websocket
  //proc.on('ws:message', (...args) => console.log(args))
  //proc.send('Ping')

  // Creates a HTTP call (see server.js)
  //proc.request('/test', {method: 'post'})
  //.then(response => console.log(response));

  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
