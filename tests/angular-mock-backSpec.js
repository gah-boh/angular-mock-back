describe('Angular Mock Back', function() {
    var IndexPage = require('./index-page-object');

    var page;

    beforeEach(function() {
        page = new IndexPage();
        page.get();
    });

    describe('mocked url', function() {

        describe('using defaults', function() {
            beforeEach(function(){
                page.setURL('/default');
            });

            it('should get the response defined in mock back', function() {
                page.callURL();
                expect(page.getResponse()).toBe('a simple response');
            });

            it('should have a default method of GET', function() {
                page.setMethod('POST');
                page.callURL();
                expect(page.getResponse()).toBe('');
            });

        });

        describe('status code', function() {

            beforeEach(function() {
                page.setURL('/reject');
            });
                
            it('should use the status code defined in mock back', function() {
                page.callURL();
                expect(page.getRejection()).toBe('this got rejected');
            });

        });

    });

    describe('overrides', function() {

        it('should be able to override the body', function() {
            page.getOverriden('overrideBodyOnly');
            page.setURL('/overrides');
            page.callURL();
            expect(page.getResponse()).toBe('overriden body only');
        });

        it('should be able to override the status', function() {
            page.getOverriden('overrideStatusOnly');
            page.setURL('/overrides');
            page.callURL();
            expect(page.getResponse()).toBe('');
            expect(page.getRejection()).toBe('default response');
            expect(page.getStatus()).toBe('400')
        });

        it('should be able to support more than one override', function() {
            page.getOverriden('overrideStatusAndBody');
            page.setURL('/overrides');
            page.callURL();
            expect(page.getRejection()).toBe('overriden body and status');
            expect(page.getStatus()).toBe('400');
        });

        it('should be return the default if the override does not exist', function() {
            page.getOverriden('overrideDoesNotExist');
            page.setURL('/overrides');
            page.callURL();
            expect(page.getResponse()).toBe('default response');
            expect(page.getStatus()).toBe('200');
        });

    });

    describe('passThrough set to true', function() {

        it('should pass through to the server', function() {
            page.get();
            page.setURL('/serverResponse');
            page.callURL();
            expect(page.getResponse()).toBe('response from server');
            expect(page.getStatus()).toBe('200');
        });

    });

});

