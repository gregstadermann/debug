'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { Broadcast, PlayerRoles } = require('ranvier');
const path = require('path');

module.exports = {
    aliases: ['addrm'],
    usage: 'addroom <direction> <newRoomId>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
        if (!args || !args.length) {
            return Broadcast.sayAt(player, 'No args\r\n');
        }

        let [ newExitDirection, newRoomId ] = args.split(' ');
        let reverseExitDirection;
        switch(newExitDirection) {
            case 'north':
                reverseExitDirection = 'south';
                break;
            case 'south':
                reverseExitDirection = 'north';
                break;
            case 'east':
                reverseExitDirection = 'west';
                break;
            case 'west':
                reverseExitDirection = 'east';
                break;
            case 'up':
                reverseExitDirection = 'down';
                break;
            case 'down':
                reverseExitDirection = 'up';
                break;
            case 'northwest':
                reverseExitDirection = 'southeast';
                break;
            case 'northeast':
                reverseExitDirection = 'southwest';
                break;
            case 'southwest':
                reverseExitDirection = 'northeast';
                break;
            case 'southeast':
                reverseExitDirection = 'northwest';
                break;
        }

        console.log('newExitDirection ', newExitDirection, 'newRoomId ', newRoomId);
        let area = player.room.area;
        let currentRoomId = player.room.id;
        let yamlRoomsFile = fs.readFileSync(path.resolve(__dirname, `../../areas/areas/${area.name}/rooms.yml`), 'utf8');
        let jsonRoomsObject = yaml.load(yamlRoomsFile);
        let newExitInCurrentRoom = {
            direction: newExitDirection,
            roomId: `${area.name}:${newRoomId}`
        }
        for (let i = 0; i < jsonRoomsObject.length; i++) {
            if(jsonRoomsObject[i].id === currentRoomId) {
                console.log('found current room ', jsonRoomsObject[i]);
                jsonRoomsObject[i].exits.push(newExitInCurrentRoom);
                break;
            }
        }

        let newRoom = {
            id: newRoomId,
            title: 'New Room',
            description: 'New Room Description',
            exits: []
        };

        let newExit = {
            direction: reverseExitDirection,
            roomId: `${area.name}:${currentRoomId}`
        }

        newRoom.exits.push(newExit);
        jsonRoomsObject.push(newRoom);
        let yamlStr = yaml.dump(jsonRoomsObject);
        fs.writeFileSync(path.resolve(__dirname, `../../areas/areas/${area.name}/rooms.yml`), yamlStr, 'utf8');
        Broadcast.sayAt(player, '... Room added.\r\n');
    }
};
