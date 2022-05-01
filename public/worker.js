self.addEventListener('push', function(e) {
    const data = e.data.json();

    const title = data.title;
    const options = {
        body: data.body,
        data,
        // actions: [
        //     {
        //         action: 'explore', 
        //         title: 'Explore this new world',
        //     },
        //     {
        //         action: 'close', 
        //         title: 'Close',
        //     },
        // ]
    };
    e.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action == 'close') { return; }
  
    event.waitUntil(clients.openWindow(event.notification.data.url))
});