
document.getElementById('closeButton').addEventListener('click', () => {
    window.veApi.windowActions.close();
});

document.getElementById('minimizeButton').addEventListener('click', () => {
    window.veApi.windowActions.minimize();
});