var config = {
    moduleName: 'mockBackApp',
    mappings: [
        {
            url: '/default',
            body: 'a simple response'
        },
        {
            url: '/reject',
            code: 400,
            body: 'this got rejected'
        },
        {
            url: '/overrides',
            body: 'default response',
            overrides: { 
                overrideBodyOnly: {
                    body: 'overriden body only'
                },
                overrideStatusOnly: {
                    code: 400
                },
                overrideStatusAndBody: {
                    body: 'overriden body and status',
                    code: 400
                }
            }
        },
        {
            url: '/serverResponse',
            passThrough: true
        }
    ]
}

angularMockBack(config);

