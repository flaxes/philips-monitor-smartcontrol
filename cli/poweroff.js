// @ts-check

/**
 *
 * @param {import('../modules/client')} client
 * @param  {...any} args
 */
async function poweroff(client, ...args) {
    return client.powerOff();
}

module.exports = poweroff;
