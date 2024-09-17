export function setApiKey(apiKey: string) {
    localStorage.setItem('apiKey', apiKey);
}

export function getApiKey() {
    return localStorage.getItem('apiKey');
}
