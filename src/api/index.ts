const backendUrl = 'http://localhost:8080/api/'; // proxy
// const backendUrl = 'http://localhost:8000/'; // original

async function fetchMasterbase(endpoint: string, body?: BodyInit) {
    const data = await fetch(`${backendUrl}${endpoint}`, {'Content-Type': 'application/json', body});
    return await data.json();

}

export function sessionId(api_key: string, demo_name: string, fake_ip: string, map: string) {
    return fetchMasterbase(`session_id?api_key=${api_key}&demo_name=${demo_name}&fake_ip=${fake_ip}&map=${map}`);
}

export function closeSession(api_key: string) {
    return fetch(`${backendUrl}close_session?api_key=${api_key}`);
}

export function provision(location: string) {
    return fetch(`${backendUrl}provision?location=${location}`);
}

export function provisionHandler() {
    return fetch(`${backendUrl}provision_handler`);
}

export function lateBytes(api_key: string, body: BodyInit) {
    return fetch(`${backendUrl}late_bytes?api_key=${api_key}`, {method: 'POST', body});
}

export function demoData(api_key: string, session_id: string) {
    return fetch(`${backendUrl}demodata?api_key=${api_key}&session_id=${session_id}`);
}

export function listDemos(api_key: string, page_size?: number, page_number?: number) {
    return fetch(`${backendUrl}list_demos?api_key=${api_key}&page_size=${page_size}&page_number=${page_number}`);
}
