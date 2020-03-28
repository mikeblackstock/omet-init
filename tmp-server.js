const {spawn} = require('child_process');
//const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');


const runcmd = (core, cmd, user, respond) => new Promise((resolve, reject) => {

	if (cmd === "init") {
		src= core.options.root + "/vfs/skel";
		var target= core.options.root + "/vfs/" + user ;
		try {

  			if (!fs.existsSync(target)){
    			fs.mkdirSync(target);
 				var srcDir= core.options.root + "/vfs/skel/Sheep-May-Safely-Graze";
				var destDir= core.options.root + "/vfs/" + user + "/Sheep-May-Safely-Graze";
				fs.mkdirSync(destDir);
			
				fs.copy(srcDir, destDir, function (err) {	
  				if (err) 
					respond(err);
				else	
					respond('Initialized home folder');
				});   			
    			
    			
    			
    			
			}
				
				
				
				
				else {
					respond("copied");
				}


			}
		catch (err) {
	 		 console.error(err);
			}
	}	



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
