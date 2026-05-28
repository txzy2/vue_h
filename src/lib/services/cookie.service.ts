export interface CookieOptions {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

export class CookieService {
    static set(name: string, value: string, options: CookieOptions = {}): void {
        const {days, path = '/', domain, secure = false, sameSite = 'Lax'} = options;

        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (days !== undefined) {
            const expires = new Date();
            expires.setDate(expires.getDate() + days);
            cookie += `; expires=${expires.toUTCString()}`;
        }

        cookie += `; path=${path}`;

        if (domain) cookie += `; domain=${domain}`;
        if (secure) cookie += '; secure';

        cookie += `; samesite=${sameSite}`;

        document.cookie = cookie;
    }

    public get(name: string): string | null {
        const key = `${encodeURIComponent(name)}=`;
        const found = document.cookie.split('; ').find(part => part.startsWith(key));

        return found ? decodeURIComponent(found.slice(key.length)) : null;
    }

    static remove(name: string, path = '/', domain?: string): void {
        CookieService.set(name, '', {days: -1, path, domain});
    }

    static getAll(): Record<string, string> {
        if (!document.cookie) return {};

        return Object.fromEntries(
            document.cookie.split('; ').map(part => {
                const idx = part.indexOf('=');
                return [
                    decodeURIComponent(part.slice(0, idx)),
                    decodeURIComponent(part.slice(idx + 1))
                ];
            })
        );
    }

    static clear(path = '/', domain?: string): void {
        Object.keys(CookieService.getAll()).forEach(name => {
            CookieService.remove(name, path, domain);
        });
    }
}

export default CookieService;
