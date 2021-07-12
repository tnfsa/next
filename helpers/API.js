export class API {

    call(endpoint, data, cb) {
        endpoint = process.env.REACT_APP_API_ENDPOINT + endpoint
        for (let str in (data.params || {})) {
            endpoint = endpoint.replaceAll(":"+str, data.params[str])
        }
        let body = (typeof data.body === 'object' ? JSON.stringify(data.body) : null)
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('session')}`,
            'X-Fingerprint': `${localStorage.getItem('fingerprint') ?? ''}`,
            ...data.headers
        })
        fetch(endpoint, {
            method: data.method,
            body,
            headers
        }).then(r => r.json()).then(cb)
    }
}