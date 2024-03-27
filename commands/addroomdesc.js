'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { Broadcast, PlayerRoles } = require('ranvier');
const path = require('path');

module.exports = {
    aliases: ['addRoomDescription', 'addRoomDesc', 'addRoomDescr', 'addrmdesc'],
    usage: 'addroomdesc <description>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
        if (!args || !args.length) {
            return Broadcast.sayAt(player, 'No args\r\n');
        }

        let description = args;
        let area = player.room.area;
        let currentRoomId = player.room.id;
        let yamlRoomsFile = fs.readFileSync(path.resolve(__dirname, `../../areas/areas/${area.name}/rooms.yml`), 'utf8');
        let jsonRoomsObject = yaml.load(yamlRoomsFile);

        for (let i = 0; i < jsonRoomsObject.length; i++) {
            if(jsonRoomsObject[i].id === currentRoomId) {
                jsonRoomsObject[i].description = description;
                break;
            }
        }
        console.log('jsonRoomsObject ', jsonRoomsObject);
        let yamlStr = yaml.dump(jsonRoomsObject);
        fs.writeFileSync(path.resolve(__dirname, `../../areas/areas/${area.name}/rooms.yml`), yamlStr, 'utf8');
    }
};
