//2020-07-23 name2ipv4 jorge@jorgechamorro.com

module.exports= function(RED) {

    "use strict";
    var dns= require("dns");

    function name2ipv4 (config) {

        RED.nodes.createNode(this, config);
        var node= this;

        node.on('input', function (msg) {

            var cb= function (err, addresses) {
              if (err) node.error(err, msg);
              else {
                msg.payload= {ip:addresses};
                node.send(msg);
              }
            };

            //Si msg.payload contiene domain_name es usa msg.payload.domain_name
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

            }
            else dns.resolve4(domain, cb);
        });
    }
    RED.nodes.registerType("name2ipv4", name2ipv4);
};
