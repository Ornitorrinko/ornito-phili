;(function(){
	

	function OrnitoPhili(pathToConfig){
		this.config = require(pathToConfig);
		var self = this;

		for (var i in self.config.resources) {
			self.resolveOne(self.config.resources[i]);
		}
	}


	OrnitoPhili.prototype.resolveOne = function(resourceName){
		var self = this
		,	resource = self[resourceName]
		;
		
		if (!resource) {
			var _resource = self.config.resources[resourceName];
			resource = 
				{ __creator : require(_resource.path)
				, __singleInstance : new (require(_resource.path))()
				}

			
			for (var i in _resource.dependencies) {
				resource.__singleInstance.injected[i] = self.resolveOne(i).__singleInstance;
			}
		}
		return resource;
	};


	module.exports = OrnitoPhili;

})();