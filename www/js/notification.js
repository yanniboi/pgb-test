console.log("yanniboi --------- function is registered");
function onNotificationGCM(e) {
    console.log("yanniboi --------- function is executed");
    console.log('EVENT -> RECEIVED:' + e.event);
    switch (e.event) {
    case 'registered':
        if (e.regid.length > 0) {
            console.log('REGISTERED with GCM Server -> REGID:' + e.regid);

            //call back to web service in Angular.  
            //This works for me because in my code I have a factory called
            //      PushProcessingService with method registerID
            var elem = angular.element(document.querySelector('[ng-app]')),
                injector = elem.injector(),
                myService = injector.get('PushProcessingService');
            myService.registerID(e.regid);
        }
        break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {
            //we're using the app when a message is received.
            console.log('--INLINE NOTIFICATION--');

            // if the notification contains a soundname, play it.
            //var my_media = new Media("/android_asset/www/"+e.soundname);
            //my_media.play();
            alert(e.payload.message);
        } else {
            // otherwise we were launched because the user touched a notification in the notification tray.
            if (e.coldstart) {
                console.log('--COLDSTART NOTIFICATION--');
            } else {
                console.log('--BACKGROUND NOTIFICATION--');
            }

            // direct user here:
            window.location = "#/bucket/list";
        }

        console.log('MESSAGE -> MSG: ' + e.payload.message);
        console.log('MESSAGE: ' + JSON.stringify(e.payload));
        break;

    case 'error':
        console.log('ERROR -> MSG:' + e.msg);
        break;

    default:
        console.log('EVENT -> Unknown, an event was received and we do not know what it is');
        break;
    }
}