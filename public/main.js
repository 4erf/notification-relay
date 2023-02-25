let worker;

const apiUrl = new URL(window.location.pathname + 'api/endpoint', window.location.origin);

(async function main() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./worker.js').then(registration => {
                worker = registration;
            });
        } catch (e) {
            console.error(e)
            alert('Service worker registration failed: ' + e.message);
        }
        
    } else {
        alert('Service workers not supported');
    }
})()

async function subscribe() {
    let subscription;
    try {
        subscription = await worker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: `BB6EXEBNhCcykz3CeI7afdxwzstx1tFWrk4hXLWSf4Ma5hZUOB0wUEtkgLw3uLrReW1rsW0vEhKoNYghFHx_-Ko`,
        });
    } catch (e) {
        console.error(e)
        alert('Cannot subscribe: ', e.message)
        return;
    }

    const topic = document.getElementById('topic').value
    try {
        await fetch(new URL('register-subscription', apiUrl), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...subscription.toJSON(), topic }),
        })
        alert('Successfully subscribed')
    } catch (e) {
        console.error(e)
        alert('Error registering subscription with Server: ', e.message)
    }

}
