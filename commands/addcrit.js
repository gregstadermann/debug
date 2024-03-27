'use strict';

const fs = require('fs');
const { Broadcast, PlayerRoles } = require('ranvier');
const path = require('path');
const {error} = require("winston");

module.exports = {
    aliases: ['addCritical'],
    usage: 'addCrit <critType>, <location>, <rank>, <damage>,  <message>,  <effects>,  <wounds>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
        if (!args || !args.length) {
            return Broadcast.sayAt(player, 'No args\r\n');
        }

        let [ critType, location, rank, damage, message, effect, wounds] = args.split(',');
        let parsedData;
        let newEntry = {
            Location: location,
            Rank: parseInt(rank),
            Damage: parseInt(damage),
            Message: message,
            Effects: [effect],
            Wounds: [wounds]
        };
        console.log('newEntry ', newEntry);
        let data = fs.readFileSync(path.resolve(__dirname, `../../combat/lib/crits/${critType}.json`), 'utf8');
        try {
            parsedData = JSON.parse(data);
            parsedData.push(newEntry);
        } catch (e) {
            error(e);
        }

        fs.writeFileSync(path.resolve(__dirname, `../../combat/lib/crits/${critType}.json`), JSON.stringify(parsedData), 'utf8');

        Broadcast.sayAt(player, '... crit Added\r\n');
    }
};
