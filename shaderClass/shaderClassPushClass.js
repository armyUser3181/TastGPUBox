
import { getDebugGroundLog, getDebugGroundError } from '../lib/lib.js';

const debugFlag = true;
const debugGroundLog = getDebugGroundLog(debugFlag);
const debugGroundError = getDebugGroundError(debugFlag);

export default class shaderClassPushClass {

    constructor() {

    }

    /**
     * 
     * @param {class} classElement 
     */
    pushClass(classElement) {
        
        debugGroundLog('Pushing class: ' + classElement.name);
        for( const property in classElement ) {
            debugGroundLog(property);
        }
        
    }
}