Gets the IP of a domain name. The IP version 4 not v6.
If in msg.payload there's a .domain_name:string, it overrides the domain_name setup in the config box Name.
Returns the data in msg.payload= {
ok:boolean, domain:domain, ip:ip, error:errortxt, dns_ip:ip }.
Uses by default the DNSs of the OS, but you can specify a different one in the config box DNS.
name2ipv4(v1.0.7)
