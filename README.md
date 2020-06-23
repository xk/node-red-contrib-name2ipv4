Gets the IP of a domain name. The IP version 4 not v6.
If in msg.payload there's a .domain-name string, it overrides the domain_name setup in the config box.
Returns the data in payload.ip.
Uses the DNSs configured in the OS.
