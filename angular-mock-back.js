;(function(window, angular) {

function angularMockBack(config) {
	var baseConfig = {method: 'GET', code: 200};
	var urlMappings = config.mappings;

	angular.module(config.moduleName)
		.config(['$provide', function($provide) {
			$provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
		}])
		.run(['$httpBackend', '$window', function($httpBackend, $window) {
			$httpBackend.whenGET(/\.html/).passThrough();

			var overrides = $window.location.search.slice(1).split('&');

			urlMappings.forEach(function(mapping) {
				var fullMapping = angular.extend({}, baseConfig, mapping);

				if(overrides.length && mapping.hasOwnProperty('overrides')) {
					overrides.filter(function(overrideName) {
							return mapping.overrides.hasOwnProperty(overrideName);
						})
						.forEach(function(overrideName) {
							angular.extend(fullMapping, mapping.overrides[overrideName]);
						});
				}

				$httpBackend.when(fullMapping.method, fullMapping.url, fullMapping.data, fullMapping.headers)
							.respond(fullMapping.code, fullMapping.body);
			});

		}]);

}

window.angularMockBack = angularMockBack;

}(window, window.angular));

