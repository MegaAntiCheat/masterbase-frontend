const backendUrl = 'http://localhost:8080/api/'; // proxy
// const backendUrl = 'http://localhost:8000/'; // original

async function fetchMasterbase<T>(endpoint: string, body?: BodyInit, options: RequestInit = {
    headers: {'Content-Type': 'application/json'},
    body
}): Promise<T | string> {
    options.headers = new Headers({
        'Content-Type': 'application/json',
        ...(options.headers || {})
    });
    options.body = body;
    const data: Response = await fetch(`${backendUrl}${endpoint}`, options);
    if (options.headers.get('Content-Type') === 'text/plain') return await data.text();
    return await data.json();
}

export function status() {
    return fetchMasterbase('', undefined, {headers: {'Content-Type': 'text/plain'}});
}

export function sessionId(api_key: string, demo_name: string, fake_ip: string, map: string) {
    return fetchMasterbase(`session_id?api_key=${api_key}&demo_name=${demo_name}&fake_ip=${fake_ip}&map=${map}`);
}

export function closeSession(api_key: string) {
    return fetchMasterbase(`close_session?api_key=${api_key}`);
}

export function provision(location?: string) {
    return fetchMasterbase(`provision?location=${location}`);
}

export function provisionHandler() {
    return fetchMasterbase(`provision_handler`);
}

export function provisionUrl() {
    return `${backendUrl}provision`;
}

export function lateBytes(api_key: string, body: BodyInit) {
    return fetchMasterbase(`late_bytes?api_key=${api_key}`, body, {method: 'POST'});
}

export function demoData(api_key: string, session_id: string) {
    return fetchMasterbase(`demodata?api_key=${api_key}&session_id=${session_id}`);
}

export function listDemos(api_key: string, page_size?: number, page_number?: number) {
    return fetchMasterbase(`list_demos?api_key=${api_key}&page_size=${page_size}&page_number=${page_number}`);
}
