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
function readUsers() {
    const data = fs_1.default.readFileSync(userDataFilePath, "utf-8");
    return JSON.parse(data);
}
function createUser(user) {
    const users = readUsers();
    const hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
    const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword, id: (0, uuid_1.v4)() });
    users.push(newUser);
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return newUser;
}
function getUserByEmail(email) {
    const users = readUsers();
    return users.find((user) => user.email === email);
}
function signinUser(email, password) {
    const user = getUserByEmail(email);
    if (!user) {
        return null;
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
}
function updateUser(id, user) {
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return null;
    }
    const updatedUser = Object.assign(Object.assign({}, user), { id });
    users[userIndex] = updatedUser;
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return updatedUser;
}
function deleteUser(id) {
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return null;
    }
    const deletedUser = users.splice(userIndex, 1);
    fs_1.default.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    return deletedUser;
}
exports.userModel = {
    readUsers,
    createUser,
    getUserByEmail,
    signinUser,
    updateUser,
    deleteUser,
};
