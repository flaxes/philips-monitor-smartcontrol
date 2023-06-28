// @ts-check

const Client = require("./modules/client");
const config = require("./config");

const [, , mode] = process.argv;

async function main() {
    const client = await Client.connect(config.url);

    // @ts-ignore
    client.setSmartImage(mode);

    client.disconnect();
}

// {"arguments":["f85acbce-b4cd-40b6-aa7e-c4fbfbcd2515"],"invocationId":"0","target":"start","type":1}

main();
