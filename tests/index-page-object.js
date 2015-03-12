function IndexPage() {
    
    var urlInput = element(by.model('mainController.url'));
    var methodInput = element(by.model('mainController.method'));
    var button = element(by.buttonText('Call URL'));
    var response = element(by.binding('mainController.response'));
    var rejection = element(by.binding('mainController.rejection'));
    var status = element(by.binding('mainController.status'));

    this.get = function() {
        return browser.get('http://localhost:9000/tests');
    };

    this.getOverriden = function(override) {
        return browser.get('http://localhost:9000/tests?' + override);
    };

    this.setURL = function(url) {
        urlInput.clear();
        urlInput.sendKeys(url);
    };

    this.setMethod = function(methodType) {
        methodInput.clear();
        methodInput.sendKeys(methodType.toUpperCase());
    }

    this.callURL = function() {
        return button.click();
    };

    this.getResponse = function() {
        return response.getText();
    };

    this.getRejection = function() {
        return rejection.getText();
    };

    this.getStatus = function() {
        return status.getText();
    };

}

module.exports = IndexPage;

