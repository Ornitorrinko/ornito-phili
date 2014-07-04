module.exports = function(file){
	try{
		return JSON.parse(require('fs').readFileSync(file));
	}catch(err){
		throw err;
	}	
};