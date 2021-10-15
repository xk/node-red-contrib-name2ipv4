Gets the IP of a domain name. The IP version 4 not v6.

+ If in ```msg.payload``` there's a .domain_name:string, it overrides the domain_name setup in the config box Name.
+ If in ```msg.payload``` there's a .dns_ip:string, it overrides the DNS IP setup in the config box DNS IP.

Returns the data in ```msg.payload``` :
```
{
  ok: boolean,
  error: errortxt,
  dns_ip: ip,
  domain: domain,
  ip: ip
}
```
Uses by default the DNSs of the OS, but you can specify a different one in the config box DNS.

name2ipv4(v1.0.8)
