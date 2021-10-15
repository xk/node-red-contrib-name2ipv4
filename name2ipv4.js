//2020-07-23 name2ipv4 jorge@jorgechamorro.com
//2021-10-15 v1.0.8

module.exports= function(RED) {

    "use strict";
    var dns= require("dns");

    function name2ipv4 (config) {

        RED.nodes.createNode(this, config);
        var node = this;
        if (!config.dns_ip) config.dns_ip = dns.getServers()[0];

        node.on('input', function (msg) {

            var payload = msg.payload;
            var dns_ip = config.dns_ip;
            var domain = config.domain_name;

            //Overrides?
            //Si msg.payload contiene domain_name se usa msg.payload.domain_name
            //Si no, se usa config.domain_name
            //Idem para dns_ip

            if (typeof payload === "object") {
                if (payload.domain_name) domain= payload.domain_name;
                if (payload.dns_ip) dns_ip= payload.dns_ip;
            }

            if (dns_ip !== dns.getServers()[0]) dns.setServers([ dns_ip ]);

            dns.resolve4(domain, function cb (err, ips) {
                var r= {
                    ok: (!err),
                    error: err,
                    dns_ip: dns_ip,
                    domain: domain,
                    ip: ""
                };
                if (ips && ips[0]) r.ip= ips[0];
                msg.payload= r;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("name2ipv4", name2ipv4);
};
