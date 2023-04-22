"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.setAppBootLogger = void 0;
const void_1 = require("@beecode/msh-logger/lib/logger-strategy/void");
const _cache = {
    logger: new void_1.LoggerStrategyVoid(),
};
const setAppBootLogger = (logger) => {
    _cache.logger = logger;
};
exports.setAppBootLogger = setAppBootLogger;
const logger = () => {
    return _cache.logger;
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map