"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const test_helper_1 = require("./test-helper");
describe('PingController', () => {
    let app;
    let client;
    before('setupApplication', async () => {
        ({ app, client } = await (0, test_helper_1.setupApplication)());
    });
    after(async () => {
        await app.stop();
    });
    it('invokes GET /ping', async () => {
        const res = await client.get('/ping?msg=world').expect(200);
        (0, testlab_1.expect)(res.body).to.containEql({ greeting: 'Hello from LoopBack1' });
    });
});
//# sourceMappingURL=ping.controller.acceptance.js.map