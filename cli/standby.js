// @ts-check

/**
 *
 * @param {import('../modules/client')} client
 * @param  {...any} args
 */
async function standby(client, ...args) {
    return client.standByMode();
}

module.exports = standby;
