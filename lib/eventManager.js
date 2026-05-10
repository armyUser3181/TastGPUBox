/**
 * 이벤트 관리 클래스.
 * 이벤트를 리스너에 푸시하고 관리합니다.
 * 이벤트 타입은 문자열로 정의되며, 예시로는 'click', 'resize', 'update', 'error' 등이 있습니다.
 * 각 이벤트 타입에 대해 콜백 함수를 등록하고, 이벤트를 발생시키면 등록된 콜백들이 호출됩니다.
 */
class EventManager {
    constructor() {
        this.listeners = {};
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
     * 특정 이벤트 타입의 리스너 수를 반환합니다.
     * @param {string} eventType - 이벤트 타입 (예: 'click')
     * @returns {number} 리스너 수
     */
    getListenerCount(eventType) {
        return this.listeners[eventType] ? this.listeners[eventType].length : 0;
    }

    /**
     * 모든 리스너를 제거합니다.
     * 주의: 이 메서드를 호출하면 모든 이벤트 타입의 리스너가 삭제됩니다.
     */
    clearAllListeners() {
        this.listeners = {};
    }
}

// 싱글톤 인스턴스 (필요 시 사용)
const eventManager = new EventManager();

export { EventManager, eventManager };