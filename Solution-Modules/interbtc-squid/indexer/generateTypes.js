const fs = require("fs");
const definitions = require("@interlay/interbtc-types").default
const types = definitions.types[0].types

writeJson('./indexer/types.json', types);
writeJson('./indexer/typesBundle.json', {types})

function writeJson(file, obj) {
    fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}
