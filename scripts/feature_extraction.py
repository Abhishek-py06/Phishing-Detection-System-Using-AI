import re
from urllib.parse import urlparse

def extract_features(url):
    parsed = urlparse(url)
    return {
        "url_length": len(url),
        "num_dots": url.count('.'),
        "has_ip_address": int(bool(re.search(r'\d+\.\d+\.\d+\.\d+', url))),
        "num_hyphens": url.count('-'),
        "num_slashes": url.count('/'),
        "num_query_params": len(parsed.query.split('&')) if parsed.query else 0,
        "is_https": int(parsed.scheme == 'https'),
    }