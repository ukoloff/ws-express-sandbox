var ws = new WebSocket(location.href.replace(/^http/, 'ws'))
ws.onopen = onOpen

function onOpen() {
    ws.send('Hi there!')
    setTimeout(resend, 1000)
}

function resend() {
    ws.send("And there...")
}
