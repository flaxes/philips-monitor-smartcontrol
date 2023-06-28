// @ts-check

const config = require("../config");
const Client = require("./client");

async function init(cli) {
    const cliFunction = require(`../cli/${cli}`);

    const client = await Client.connect(config.url);

    await cliFunction(client, process.argv.slice(3));

    client.disconnect();
}

module.exports = init;
