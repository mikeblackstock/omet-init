const {spawn} = require('child_process');
//const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');


const runcmd = (core, cmd, user, respond) => new Promise((resolve, reject) => {

	if (cmd === "check") {
		let dir= core.options.root + "/vfs/" + user ;
//		var p = spawn("mkdir", ['-p', dir]);
		var p = spawn("file", [dir]);
//		respond("Initialized " + user);
	}	
	p.stdout.on('data', data => {
		if (data.indexOf('No such file') > -1) {


			
			fs.mkdirSync(core.options.root + "/vfs/" + user);
			var srcDir= core.options.root + "/vfs/demo/Sheep-May-Safely-Graze";
			var destDir= core.options.root + "/vfs/" + user + "/Sheep-May-Safely-Graze";
			fs.mkdirSync(destDir);
			
			fs.copy(srcDir, destDir, function (err) {
  				if (err) 
					respond(err);
				else	
					respond('Initialized home folder');
			});
			
			var src= core.options.root + "/vfs/demo/Fragment.ly";
			var dest= core.options.root + "/vfs/" + user + "/Fragment.ly";
			fs.copy(src, dest, function (err) {
  				if (err) 
					respond(err);

			});			

		}	

	});	

	p.stderr.on('data', data => respond("21: " + data.toString()));

 	p.on('error', error => reject(error));
 	p.on('exit', code => {

    return !code ? resolve() : reject('Failed');
  });
});

module.exports = (core, proc) => ({

  // When server initializes
  init: async () => {
    // HTTP Route example (see index.js)
    core.app.post(proc.resource('/test'), (req, res) => {
      res.json({hello: 'World'});
    });

    // WebSocket Route example (see index.js)
    // NOTE: This creates a new connection. You can use a core bound socket instead
    core.app.ws(proc.resource('/socket'), (ws, req) => {

 //     ws.send('Hello World');
    });


  },

  // When server starts
  start: () => {},

  // When server goes down
  destroy: () => {},


  // When using an internally bound websocket, messages comes here
  onmessage: (ws, respond, msg) => {

			
			const {cmd, user} = JSON.parse(msg);

			runcmd(core, cmd, user, respond);
			
			
			
//    respond('Internal socket');
  }
});
