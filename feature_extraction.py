import re 
from urllib.parse import urlparse

def extract_features(url):
    features={
        "url_length": len(url),
        "num_dots": url.count('.'),
        "has_ip_address": bool(re.search(r'\d+\.\d+\.\d+\.\d+', url)),
        "num_hyphens": url.count('-'),
        "num_slashes": url.count('/'),
        "num_query_params": len(urlparse(url).query.split('&')) if urlparse(url).query else 0,
        "is_https": url.startswith("https"),
    }
    return features