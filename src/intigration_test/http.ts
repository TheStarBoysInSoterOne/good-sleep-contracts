import https from 'https'
import http from 'http'

export class Response {
    code!: number
    data!: object
    message!: string
}

export const GET = async (url: string, callback: (resp: Response) => void) => {
    const execute = (res: http.IncomingMessage) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; })
        res.on('end', () => {
            callback(JSON.parse(rawData) as Response)
        })
    }
    if (url.indexOf('http://') == 0) {
        http.get(url, res => {
            execute(res)
        })
    } else if (url.indexOf('https://') == 0) {
        https.get(url, res => {
            execute(res)
        })
    }
}

export const POST = async (url: string, postData: any, callback: (resp: Response) => void) => {
    const execute = (res: http.IncomingMessage) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; })
        res.on('end', () => {
            let resp = JSON.parse(rawData) as Response
            if (resp.code != 0) {
                console.error('request fails, code: ', resp.code, 'mesg: ', resp.message)
            }
            callback(resp)
        })
    }

    postData = JSON.stringify(postData)
    console.log('postData: ', postData)
    const isHTTP = url.indexOf('http://') == 0

    let hostname, port
    if (isHTTP) {
        url = url.replace('http://', '')
        port = 80
    } else {
        url = url.replace('https://', '')
        port = 443
    }
    hostname = url.substring(0, url.indexOf('/'))
    const path = url.substring(url.indexOf('/'))

    const options = {
        hostname: hostname,
        port:  port,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
    }

    let req: http.ClientRequest
    if (isHTTP) {
        req = http.request(options, res => {
            execute(res)
        })
    } else {
        req = https.request(options, res => {
            execute(res)
        })
    }

    req.on('error', err => {
        console.error('request err: ', err)
    })
    req.write(postData)
    req.end()
}