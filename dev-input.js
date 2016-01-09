module.exports = function(RED) {

  var msg = { topic:"dev-input" }

  function parseBuffer( buffer ) {
    var eventObject = {};

    eventObject.tv_sec   = buffer.readInt32LE(0),
    eventObject.tv_usec  = buffer.readInt32LE(8),
    eventObject.type     = buffer.readUInt16LE(16),
    eventObject.code     = buffer.readUInt16LE(18),
    eventObject.value    = buffer.readInt32LE(20);

    return eventObject;
  }

  function DevInput(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    var FS = require('fs');

    FS.createReadStream('/dev/input/event10').on('data', function( buffer ) {
      msg.payload = parseBuffer(buffer)
      node.send(msg);
    });

  }
  RED.nodes.registerType("dev-input",DevInput);
}
