function isLocalhost(url) 
{
    return url.includes('localhost') || url.includes('127.0.0.1');
}
API_URL = (isLocalhost(window.location.hostname) != true ? `https://${window.location.hostname}/api` : 'http://localhost:3000/api');

IMAGE_URL = (isLocalhost(window.location.hostname) != true ? `https://${window.location.hostname}` : 'http://localhost:3000');


