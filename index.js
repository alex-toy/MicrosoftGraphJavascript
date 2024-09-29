async function run() {
    console.log("running...!!!");
    var tenantId = "5b38c313-3bf3-4f5b-90e6-8e32480e8986";
    const config = {
        auth: {
            clientId: 'a99569b7-0b82-4b43-bf0b-89e6c077bb30',
            authority: `https://login.microsoftonline.com/${tenantId}/`,
            redirectUri: 'http://localhost:8080'
        }
    };
    var client = new msal.PublicClientApplication(config);
    
    var loginRequest = {
        scopes: [ 'user.read' ]
    };
    let loginResponse = await client.loginPopup(loginRequest);
    console.log('Login Response', loginResponse);

    var tokenRequest = {
        scopes: [ 'user.read' ],
        account: loginResponse.account
    };
    let tokenResponse = await client.acquireTokenSilent(tokenRequest);
    console.log('Token Response', tokenResponse);

    let payload = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
            'Authorization': 'Bearer ' + tokenResponse.accessToken
        }
    });
    let json = await payload.json();
    console.log('Graph Response', json);
}