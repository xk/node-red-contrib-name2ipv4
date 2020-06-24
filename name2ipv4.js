//2020-07-23 name2ipv4 jorge@jorgechamorro.com

module.exports= function(RED) {

    "use strict";
    var dns= require("dns");
    var initial_dns_ip= dns.getServers()[0];

    function name2ipv4 (config) {

        RED.nodes.createNode(this, config);
        var node= this;
        var now_using_dns_ip= dns.getServers()[0];

        function validar_ip (ip) {
          var r= ip.split(".");
          if (r.length !== 4) return "";
          r= r.filter(function(v,i,o) {
            var n= Math.floor(+v);
            if (v !== (""+n)) return false;
            if ((n<0) || (n>255)) return false;
            return true;
          });
          if (r.length !== 4) return "";
          else return r.join(".");
        }

        node.on('input', function (msg) {

            function cb (err, ips) {
              var r= {
                ok:(!err),
                domain:domain,
                ip:"",
                error:err,
                dns_ip: now_using_dns_ip
              };
              if (ips && ips[0]) r.ip= ips[0];
              msg.payload= r;
              node.send(msg);
            };

            //Si msg.payload contiene domain_name se usa msg.payload.domain_name
            //Si no, se intenta usar config.domain_name

            var err;
            var domain;
            if (msg.payload.domain_name) {
              if (typeof msg.payload.domain_name === "string") {
                domain= msg.payload.domain_name;
              }
              else err= "msg.payload.domain_name is not a string";
            }
            else if (config.domain_name) {
              if (typeof config.domain_name === "string") {
                domain= config.domain_name;
              }
              else err= "config.domain_name is not a string";
            }
            else err= "invalid domain name";

            if (err) {
              setTimeout(function () { cb(err, []); }, 0);
              return;
            }

            if (config.dns_ip) {
              if (typeof config.dns_ip === "string") {
                var dns_ip= validar_ip(config.dns_ip);
                if (dns_ip) {
                  if (dns_ip !== now_using_dns_ip) {
                    dns.setServers([ dns_ip ]);
                    now_using_dns_ip= dns_ip;
                  }
                }
              }
            }
            else if (now_using_dns_ip !== initial_dns_ip) {
              dns.setServers([ initial_dns_ip ]);
              now_using_dns_ip= initial_dns_ip;
            }

            //config.dns_ip= dns.getServers()[0];
            dns.resolve4(domain, cb);
        });
    }
    RED.nodes.registerType("name2ipv4", name2ipv4);
};
