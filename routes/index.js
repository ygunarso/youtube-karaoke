const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');

const constructorMethod = app => {
    app.get('/', async (req, res) => {
        res.sendFile(path.resolve('public/index.html'));
    });

    app.post('/load', async (req, res) => {
        try {
    		let URL = req.body.url;
    		let title = 'video';
            let link = 'link';

    		await ytdl.getInfo(URL, {
    			format: 'mp4'
    		}, (err, info) => {
                console.log(info);
                let format = info.formats;
                let object = format.find(obj => obj.container == 'mp4');
                link = object.url;
    			title = info.player_response.videoDetails.title;
    		});

            let temp = 'loadNow(\'' + link + '\')';

            let data = fs.readFileSync(path.resolve('public/index.html'), "utf8");
            data = data.replace('loadNow()', temp)
            res.send(data);
            //
    		// res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
            //
    		// ytdl(URL, {
    		// 	format: 'mp4',
    		// }).pipe(res);
    	} catch (err) {
    		console.error(err);
    	}
    });

    // app.use("*", (req, res) => {
    //     res.redirect("/");
    // });
};

module.exports = constructorMethod;
