'use strict';

const BundleManager = require('../../../../gemstone3-core/src/BundleManager');
const { PlayerRoles } = require('ranvier');

module.exports = {
    aliases: ['create room'],
    usage: 'createroom <direction, room id>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
        let areaManager = state.AreaManager.getArea('wl-outside-gates');
        //console.log(areaManager);
        //BundleManager.loadBundle('areas', `./areas`);
    }
};
