"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const rooms = [];
const roomHandler = (socket, io) => {
    const joinRoom = ({ roomId, peerId, userId }) => {
        console.log(16, 'user join', roomId, peerId, 'userId', userId);
        // check xem người dùng đã ở trong room hay chưa
        const isExist = rooms.some((e) => e.userId === userId);
        if (isExist)
            return socket.emit('Nguoi_dung_da_ton_tai', { roomId, peerId, userId });
        socket.join(roomId);
        rooms.push({ roomId: roomId, peerId: peerId, userId: userId });
        getListUsersRoom(roomId);
        // thông báo đến tất cả người trong nhóm trừ user vào, là có người mới online
        notificationsNewUserJoin(roomId, peerId, userId);
        // Lắng nghe sự kiện toggle-camera từ client và phát lại cho tất cả các client khác trong phòng
        socket.on('toggle-camera', (data) => {
            console.log(46, data);
            socket.broadcast.to(roomId).emit('update-camera-status', data);
        });
        // Lắng nghe sự kiện toggle-microphone từ client và phát lại cho tất cả các client khác trong phòng
        socket.on('toggle-microphone', (data) => {
            socket.broadcast.to(roomId).emit('update-microphone-status', data);
        });
        // tắt tất cả camera trong nhóm trừ mình ra (nâng cấp sau, chỉ user tạo khóa học mới có full quyền)
        socket.on('turn-off-all-cameras', () => {
            socket.broadcast.to(roomId).emit('turn-off-camera');
        });
        // Lắng nghe sự kiện gửi message từ client
        socket.on('send-message', (data) => {
            io.to(roomId).emit('receive-message', data);
        });
        socket.on('disconnect', () => {
            console.log('user left', { roomId, peerId, userId });
            leaveRoom({ roomId, peerId, userId });
        });
    };
    const leaveRoom = ({ roomId, peerId, userId }) => {
        const index = rooms.findIndex((user) => user.peerId === peerId);
        rooms.splice(index, 1);
        socket.broadcast.to(roomId).emit('user_leave_room', { roomId, peerId, userId });
        getListUsersRoom(roomId);
    };
    const notificationsNewUserJoin = (roomId, peerId, userId) => {
        io.to(roomId).emit('user-joined', { peerId: peerId, userId: userId });
        socket.broadcast.to(roomId).emit('new_user_join', { roomId: roomId, peerId: peerId, userId: userId });
        getListUsersRoom(roomId);
    };
    const getListUsersRoom = (roomId) => {
        io.to(roomId).emit('list_users_rooms_online', rooms.filter((user) => user.roomId === roomId));
    };
    socket.on('join-room', joinRoom);
};
exports.roomHandler = roomHandler;
