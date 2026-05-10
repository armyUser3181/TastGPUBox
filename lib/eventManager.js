/**
 * 이벤트 관리 클래스.
 * 이벤트를 리스너에 푸시하고 관리합니다.
 * 이벤트 타입은 문자열로 정의되며, 예시로는 'click', 'resize', 'update', 'error' 등이 있습니다.
 * 각 이벤트 타입에 대해 콜백 함수를 등록하고, 이벤트를 발생시키면 등록된 콜백들이 호출됩니다.
 * 복합 이벤트(이벤트 시퀀스)를 조합해서 관리할 수 있습니다. 예: 마우스 업/다운/무브로 드래그 이벤트 생성.
 */
class EventManager {
    constructor() {
        this.listeners = {};
        this.compositeListeners = {};
    }

    /**
     * 이벤트 리스너를 추가합니다.
     * @param {string} eventType - 이벤트 타입 (예: 'click', 'resize', 'update', 'error')
     * @param {function} callback - 콜백 함수 (이벤트 발생 시 호출됨)
     */
    addListener(eventType, callback) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(callback);
    }

    /**
     * 이벤트 리스너를 제거합니다.
     * @param {string} eventType - 이벤트 타입 (예: 'click', 'resize')
     * @param {function} callback - 제거할 콜백 함수
     */
    removeListener(eventType, callback) {
        if (this.listeners[eventType]) {
            this.listeners[eventType] = this.listeners[eventType].filter(listener => listener !== callback);
        }
    }

    /**
     * 이벤트를 발생시키고 모든 리스너를 호출합니다.
     * @param {string} eventType - 이벤트 타입 (예: 'update', 'error')
     * @param {*} data - 이벤트 데이터 (리스너에 전달됨)
     */
    emit(eventType, data) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${eventType}:`, error);
                }
            });
        }
    }

    /**
     * 복합 이벤트 리스너를 추가합니다. 이벤트 시퀀스가 순서대로 발생하면 콜백을 호출합니다.
     * 시퀀스 중간에 다른 이벤트가 발생하면 진행이 리셋됩니다.
     * 예: ['mousedown', 'mousemove', 'mouseup']로 드래그 이벤트를 생성.
     * 실제 사용 시, DOM 이벤트 리스너에서 emit을 호출하세요 (예: element.addEventListener('mousedown', () => manager.emit('mousedown', event))).
     * @param {string} compositeType - 복합 이벤트의 집단 명칭 (예: 'drag')
     * @param {string[]} eventSequence - 사용하는 이벤트 배열 (DOM 이벤트 타입: 'mousedown', 'mousemove', 'mouseup', 'click', 'dblclick', 'keydown', 'keyup', 'keypress', 'resize', 'scroll', 'focus', 'blur', 'input', 'change', 'submit', 'load', 'unload', 'beforeunload', 'DOMContentLoaded', 'contextmenu', 'wheel', 'touchstart', 'touchmove', 'touchend', 'pointerdown', 'pointermove', 'pointerup')
     * @param {function} callback - 이벤트에 리깅되는 콜백 함수 (시퀀스 완료 시 호출됨, 마지막 이벤트의 데이터가 전달됨)
     */
    addCompositeListener(compositeType, eventSequence, callback) {
        this.compositeListeners[compositeType] = { sequence: eventSequence, callback, index: 0, handlers: [] };
        // 각 이벤트에 핸들러 추가
        eventSequence.forEach(event => {
            const handler = (data) => this._handleComposite(event, compositeType, data);
            this.addListener(event, handler);
            this.compositeListeners[compositeType].handlers.push({ event, handler });
        });
    }

    /**
     * 복합 이벤트 리스너를 제거합니다.
     * 등록된 모든 이벤트 핸들러를 제거합니다.
     * @param {string} compositeType - 복합 이벤트 타입
     */
    removeCompositeListener(compositeType) {
        const comp = this.compositeListeners[compositeType];
        if (comp) {
            // 각 이벤트에서 핸들러 제거
            comp.handlers.forEach(({ event, handler }) => {
                this.removeListener(event, handler);
            });
            delete this.compositeListeners[compositeType];
        }
    }

    /**
     * 내부 메서드: 복합 이벤트 시퀀스를 처리합니다.
     * @private
     * @param {string} event - 발생한 이벤트 타입
     * @param {string} compositeType - 복합 이벤트 타입
     * @param {*} data - 이벤트 데이터
     */
    _handleComposite(event, compositeType, data) {
        const comp = this.compositeListeners[compositeType];
        if (!comp) return;

        if (comp.sequence[comp.index] === event) {
            comp.index++;
            if (comp.index === comp.sequence.length) {
                // 시퀀스 완료
                comp.callback(data);
                comp.index = 0; // 리셋
            }
        } else {
            // 시퀀스 불일치, 리셋
            comp.index = 0;
        }
    }

    /**
     * 특정 이벤트 타입의 리스너 수를 반환합니다.
     * @param {string} eventType - 이벤트 타입 (예: 'click')
     * @returns {number} 리스너 수
     */
    getListenerCount(eventType) {
        return this.listeners[eventType] ? this.listeners[eventType].length : 0;
    }

    /**
     * 모든 리스너를 제거합니다.
     * 주의: 이 메서드를 호출하면 모든 이벤트 타입과 복합 이벤트의 리스너가 삭제됩니다.
     */
    clearAllListeners() {
        this.listeners = {};
        this.compositeListeners = {};
    }
}

// 싱글톤 인스턴스 (필요 시 사용)
const eventManager = new EventManager();

export { EventManager, eventManager };