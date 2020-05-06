if ('PLZ_DONT_INSTALL_SW' === 'PLZ_INSTALL_SW' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
