;(function(){
	
	var   RESOURCES_KEY = "resources"
		, DEPENDENCIES_KEY = "dependencies"
		, DEFINITION_KEY = "definitions"
		, PATH_KEY = "path";


	function OrnitoPhili(pathToConfig){
		this.config = require(pathToConfig);
		this.parse();
	}

	OrnitoPhili.prototype.parse = function(){
		var resources = this.config[RESOURCES_KEY]
			, availableResources = []
			, invalidResources = [];

		Object.keys(resources)
			.forEach(function(resource){
				var path = resources[resource][PATH_KEY];
				if(!path){
					invalidResources.push(resource);
				}else{
					availableResources.push({
						"id": resource
						, "path": path
					});
				}
			});

		this.resources = availableResources;
	};

	OrnitoPhili.prototype.get = function(resourceName){
		if(!resourceName){
			throw "Provide a resource name to get an instance =/~";
		}

		var notFound = function(){
			throw "Resource =>" + resourceName + " not found!";
		}
		, lookingForResource = function(name){
			var resource = this.resources.filter(function(res){
				return res.id === name;
			});

			if(resource.length > 0){
				return resource[0];
			}else{
				notFound();
			}
		};

		var definition = this.config[DEFINITION_KEY][resourceName];
		if(!definition){
			notFound();
		}


		var contextResource = lookingForResource.apply(this, [resourceName])
			, dependencies = definition.dependencies;
		if(!dependencies){
			return resolve(contextResource);
		}

		var pending = [];
		for(var dependency in dependencies){
			var ref = dependencies[dependency]
				, resource = lookingForResource.apply(this, [ref]);

			if(resource){
				pending.push(resource.path);
			}
		}

		return resolve(contextResource, pending);
	};

	function resolve(resource, initializers){
		if(initializers){
			
			var params = [];
			for(var arg in initializers){
				params.push(require(initializers[arg]));
			}

			return new (require(resource.path))(params);

		}else{
			return require(resource);
		}
	};

	module.exports = OrnitoPhili;

})();