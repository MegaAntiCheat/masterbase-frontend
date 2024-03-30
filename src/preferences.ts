async function setSettingKey(
    key: string,
    value: unknown,
    type: 'internal' | 'external' = 'external',
) {
    try {
        const formBody = {
            [type]: {
                [key]: value,
            },
        };

        const options = {
            method: 'PUT',
            body: JSON.stringify(formBody),
            headers: {
                'Content-Type': 'application/json',
            },
        };
// TODO endpoint or something
        // const response = await fetch(PREF_ENDPOINT, options);
        // console.log(response);
        //
        // if (!response.ok) throw new Error('Failed to set setting.');

        //return response.json();
    } catch (e) {
        console.error(e);
    }
}

async function setSettings(newSettings: PreferenceResponse) {
    try {
        const options = {
            method: 'PUT',
            body: JSON.stringify(newSettings),
            headers: {
                'Content-Type': 'application/json',
            },
        };
// TODO endpoint or something
        // const response = await fetch(PREF_ENDPOINT, options);
        // console.log(response);
        //
        // if (!response.ok) throw new Error('Failed to set setting.');

        //return response.json();
    } catch (e) {
        console.error(e);
    }
}

interface PreferenceResponse {
    internal: {
        tf2Directory: string;
        rconPassword: string;
        steamApiKey: string;
        friendsApiUsage: string;
    };
    external: Settings;
}

interface Settings {
    language: string;
    openInApp: boolean;
    colors: {
        You: string;
        Player: string;
        Friend: string;
        Trusted: string;
        Suspicious: string;
        FriendOfCheater: string;
        Cheater: string;
        Convict: string;
        Bot: string;
    };
}

export const defaultSettings: PreferenceResponse = {
    external: {
        language: 'English',
        openInApp: false,
        colors: {
            You: '#00aaaa',
            Player: 'none',
            Friend: '#007700',
            Trusted: '#00ee00',
            Suspicious: '#aaaa00',
            FriendOfCheater: '#888888',
            Cheater: '#ee0000',
            Convict: '#ee0066',
            Bot: '#880000',
        },
    },
    internal: {
        friendsApiUsage: '',
        tf2Directory: '',
        steamApiKey: '',
        rconPassword: '',
    },
};

// Merge settings with default settings
function mergeWithDefaults(
    settings: Partial<PreferenceResponse>,
): PreferenceResponse {
    const mergedSettings: PreferenceResponse = {
        external: {
            ...defaultSettings.external,
            ...settings.external,
            colors: {
                ...defaultSettings.external.colors,
                ...settings.external?.colors,
            },
        },
        internal: {
            ...defaultSettings.internal,
            ...settings.internal,
        },
    };
    return mergedSettings;
}

async function getAllSettings(): Promise<PreferenceResponse> {
    try {
        // TODO endpoint or something
        // const settings = await (await fetch(PREF_ENDPOINT)).json();
        const mergedSettings = mergeWithDefaults({});
        return mergedSettings;
    } catch (e) {
        console.error(e);
        return defaultSettings;
    }
}

export {setSettingKey, setSettings, getAllSettings};