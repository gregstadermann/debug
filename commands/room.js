'use strict';

const { Broadcast, PlayerRoles } = require('ranvier');

module.exports = {
    aliases: ['roominfo'],
    usage: 'room <room>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
        if (!args || !args.length) {
            Broadcast.sayAt(player, `Room.id = <bold>${player.room.def.id}</bold> | Room.title = <bold>${player.room.def.title}</bold>`);
            Broadcast.sayAt(player, '');
            let exit;
            for(exit of player.room.exits) {
                Broadcast.sayAt(player, `Exit: ${exit.direction} - ${exit.roomId}`);
            }
            console.log(player.room.getExits());
            return;
        }

        const target = args;
        const isRoom = target.includes(':');
        let targetRoom = null;

        if (isRoom) {
            targetRoom = state.RoomManager.getRoom(target);
            //console.log(targetRoom);
            if (!targetRoom) {
                return Broadcast.sayAt(player, 'No such room entity reference exists.');
            } else {
                return Broadcast.sayAt(player, 'No such player online.');
            }
        }
    }
};
