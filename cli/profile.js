// @ts-check

const fs = require("fs");
const { join } = require("path");
const { wait } = require("../modules/helpers");
const PROFILE_DIR = "../profiles";

const profiles = fs.readdirSync(join(__dirname, PROFILE_DIR)).map((item) => item.replace(".json", ""));

/**
 *
 * @param {import('../modules/client')} client
 * @param  {...any} args
 */
async function smartimage(client, args) {
    const [profileName] = args;

    console.debug("Available:", profiles, "\n", "Selected:", profileName);

    const isRealProfile = profiles.includes(profileName);

    if (!isRealProfile) {
        console.error(`[${profileName}] is unknown profile`);
        return;
    }

    const profile = require(`${PROFILE_DIR}/${profileName}.json`);

    /**
     * {
    "temperature": "6500",
    "smartimage": "off",
    "brightness": 50
}
     */

    if (profile.smartimage) {
        await client.setSmartImage(profile.smartimage);
        console.log(`Set smart image: ${profile.smartimage}`);
    }

    if (profile.temperature) {
        await client.setColorTemperature(profile.temperature);
        console.log(`Set temperature: ${profile.temperature}`);
    }

    if (typeof profile.brightness === "number") {
        await client.setBrightness(profile.brightness);
        console.log(`Set brightness: ${profile.brightness}`);
    }

    await wait(500);
    console.log(`[${profileName}] SET`);
}

module.exports = smartimage;
