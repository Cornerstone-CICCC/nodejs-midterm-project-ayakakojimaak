"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, "../../");
const userDataFilePath = path_1.default.join(filepath, "data/users.json");
function getUsers() {
    const data = fs_1.default.readFileSync(userDataFilePath, "utf-8");
    return JSON.parse(data);
}
function createUser(user) {
    const users = getUsers();
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
        return null;
    }
    const hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
    const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword, id: (0, uuid_1.v4)(), role: "member" });
    users.push(newUser);
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return newUser;
}
function getUserByEmail(email) {
    const users = getUsers();
    return users.find((user) => user.email === email);
}
function getUserById(id) {
    const users = getUsers();
    return users.find((user) => user.id === id);
}
function updateUser(id, user) {
    const users = getUsers();
    const oldUser = getUserById(id);
    if (!user) {
        return null;
    }
    const updatedUser = {
        username: user.username ? user.username : oldUser.username,
        email: user.email ? user.email : oldUser.email,
        password: oldUser.password,
        role: oldUser.role,
        id: id,
    };
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = updatedUser;
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return updatedUser;
}
function deleteUser(id) {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return null;
    }
    const deletedUser = users.splice(userIndex, 1);
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return deletedUser;
}
exports.userModel = {
    getUsers,
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
};
