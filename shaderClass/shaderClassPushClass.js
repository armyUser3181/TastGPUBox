import { getDebugGroundLog, getDebugGroundError } from '../utils/debug.js';

const debugFlag = true;
const debugGroundLog = getDebugGroundLog(debugFlag);
const debugGroundError = getDebugGroundError(debugFlag);

export default class shaderClassPushClass {
    constructor() {}

    /** @param {Function} classElement */
    pushClass(classElement) {
        debugGroundLog('Pushing class: ' + classElement.name);
        for (const property in classElement) {
            debugGroundLog(property);
        }
    }
}
