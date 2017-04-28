$(function() {
    function NotLoggedInViewModel(parameters) {
        var self = this;

       self.loginState = parameters[0];

       self.ready = ko.observable(false);
       self.loggedIn = ko.observable(false);

       function checkLoggedIn() {
           // Checking the login state here myself rather than relying
           // on LoginStateViewModel because it shows 'false' briefly
           // on page load, causing the warning banner to blink.
           // Which is annoying.

           OctoPrint.browser.passiveLogin().done(function (response) {
               self.ready(true);

                if (response && response.name) {
                    self.loggedIn(true);
                }
                else {
                    self.loggedIn(false);
                };
           });
       }

       self.loginState.loggedIn.subscribe(function () {
           checkLoggedIn();
       });

       checkLoggedIn();
    }

    OCTOPRINT_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        NotLoggedInViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["loginStateViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#notloggedin"]
    ]);
});
