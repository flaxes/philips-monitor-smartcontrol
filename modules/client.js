// @ts-check

const ws = require("ws");
const uuid = require("uuid");
const SMART_IMAGE_TYPE = require("../smartcontrol/smart-image");
const COLOR_TEMPERATURE_TYPE = require("../smartcontrol/color-temperature");

const END = "";

class Client {
    /**
     * @private
     * @param {string} url
     */
    constructor(url) {
        /** @private */
        this._client = new ws(url);
        /** @private */
        this._requestId = 0;
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<Client>}
     */
    static connect(url) {
        const client = new this(url);

        return new Promise((resolve, reject) => {
            client._client.on("open", () => {
                client.send({ protocol: "json", version: 1 }, () => {
                    console.debug("Sending initial packet");
                });
            });

            client._client.once("message", (firstMsg) => {
                const firstDecoded = firstMsg.toString("utf-8");

                console.log("First message", firstDecoded);

                client.sendId("start", 1);

                client._client.once("message", (_msg) => {
                    // All monitor's preferences is here in _msg

                    resolve(client);
                });
            });

            client._client.on("error", (err) => reject(err));
        });
    }

    disconnect() {
        return this._client.close();
    }

    /**
     *
     * @param {keyof SMART_IMAGE_TYPE} mode
     */
    setSmartImage(mode) {
        const modeNum = SMART_IMAGE_TYPE[mode];

        if (typeof modeNum !== "number") {
            throw new Error(`[${mode}] IS UNKNOWN SMART-IMAGE MODE`);
        }

        return this.sendId("SetOSD", 1, ["OP_DC_DisplayApplication", modeNum]);
    }

    /**
     *
     * @param {keyof COLOR_TEMPERATURE_TYPE} mode
     */
    setColorTemperature(mode) {
        const modeNum = COLOR_TEMPERATURE_TYPE[mode];

        if (typeof modeNum !== "number") {
            throw new Error(`[${mode}] IS UNKNOWN COLOR-TEMPERATURE`);
        }

        return this.sendId("SetOSD", 1, ["OP_14_SelectColorPreset", modeNum]);
    }

    /**
     *
     * @param {number} num
     * @returns
     */
    async setBrightness(num) {
        if (typeof num !== "number" || num < 0 || num > 100) {
            throw new Error(`[${num}] IS INVALID BRIGHTNESS (check number)`);
        }
        await this.sendId("SetOSD", 1, ["OP_10_Luminance", 0]);

        return this.sendId("SetOSD", 1, ["OP_10_Luminance", num]);
    }

    standByMode() {
        return this.sendId("ImmediateStandby", 1);
    }

    powerOff() {
        return this.sendId("ImmediatePowerOff", 1);
    }

    /**
     * @private
     *
     * @param {string | object} msg
     */
    send(msg, cb) {
        this._client.send(`${typeof msg === "object" ? JSON.stringify(msg) : msg}${END}`, cb);
    }

    /**
     * @private
     *
     * @param {string} target
     * @param {number} type
     * @param {any[]} arg
     */
    sendId(target, type, arg = []) {
        arg.unshift(uuid.v4());

        return new Promise((resolve, reject) => {
            this.send({ arguments: arg, invocationId: `${this._requestId++}`, target, type }, (err) => {
                if (err) return reject(err);

                resolve(void 0);
            });
        });
    }
}

module.exports = Client;
