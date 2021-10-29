
# Modal Controller Conditional Dismissing

This sample provides a solution for controlling the cancellation dimissal of an [ion-modal](https://ionicframework.com/docs/api/modal). Currently, the configuration only allows for setting `backdropDismiss` on instantiation. This workaround is one approach that would allow for that same cancelling dimissal, but with the control to prevent it (in this example, it's while an async call is happening).

The `backdropDismiss` is set to false in this example as the default. We add a couple of [@HostListener
](https://angular.io/api/core/HostListener) decorators:

1. `document:mouseup` listens for mouseup events to determine if the backdrop was clicked. If so, and no async load is happening, then the modal is dismissed
2. `document:keyup.escape` listens for the escape key. If its entered and no async load is happening, then the modal is dismissed
