// @ts-check

/**
 *
 * @param {import('../modules/client')} client
 * @param  {...any} args
 */
async function smartimage(client, ...args) {
    client.setSmartImage(args[0]);
}

module.exports = smartimage;
