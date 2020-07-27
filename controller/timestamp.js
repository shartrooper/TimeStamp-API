const timeStampRouter = require('express').Router();

timeStampRouter.get('/', (req, res, next) => {
    req.unix = new Date().getTime();
    req.utc = new Date().toUTCString();
    next();
}, (req, res) => res.json({
        unix: req.unix,
        utc: req.utc
    }));

timeStampRouter.get('/:date', (req, res, next) => {
    let dateString = req.params.date;

    if ( new Date(dateString) == 'Invalid Date' ) { 
		dateString = /\D/gi.test(dateString)?dateString:parseInt(dateString); 
	}
    //console.log(dateString);
	
	req.unix = new Date(dateString).getTime();
    req.utc = new Date(dateString).toUTCString();
	
    /*console.log('unix', req.unix);
    console.log('utc', req.utc);*/
    next();
}, (req, res) => {
    res.json(req.unix? {
        unix: req.unix,
        utc: req.utc
    }
    : {"error": req.utc});
});

module.exports = timeStampRouter;
