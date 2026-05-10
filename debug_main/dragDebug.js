import { EventManager } from '../lib/eventManager.js';

/**
 * 드래그 이벤트 디버깅 클래스
 * 마우스 down -> move -> up 시퀀스를 감지하여 드래그 이벤트 발생
 */
class DragDebug {
    constructor(element) {
        this.element = element;
        this.eventManager = new EventManager();
        this.dragData = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            endX: 0,
            endY: 0,
            isDragging: false
        };

        this.init();
    }

    /**
     * 드래그 디버깅 초기화
     */
    init() {
        // DOM 이벤트를 EventManager로 라우팅
        this.element.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // 복합 이벤트 등록: mousedown -> mousemove -> mouseup 시퀀스
        this.eventManager.addCompositeListener(
            'drag',
            ['mousedown', 'mousemove', 'mouseup'],
            (lastEventData) => this.onDragComplete(lastEventData)
        );

        console.log('DragDebug initialized');
    }

    /**
     * mousedown 핸들러
     */
    handleMouseDown(e) {
        this.dragData.startX = e.clientX;
        this.dragData.startY = e.clientY;
        this.dragData.isDragging = true;

        console.log(`mousedown: (${e.clientX}, ${e.clientY})`);
        this.eventManager.emit('mousedown', {
            type: 'mousedown',
            x: e.clientX,
            y: e.clientY,
            event: e
        });
    }

    /**
     * mousemove 핸들러
     */
    handleMouseMove(e) {
        if (this.dragData.isDragging) {
            this.dragData.currentX = e.clientX;
            this.dragData.currentY = e.clientY;

            const deltaX = this.dragData.currentX - this.dragData.startX;
            const deltaY = this.dragData.currentY - this.dragData.startY;

            console.log(`mousemove: (${e.clientX}, ${e.clientY}) delta: (${deltaX}, ${deltaY})`);
            this.eventManager.emit('mousemove', {
                type: 'mousemove',
                x: e.clientX,
                y: e.clientY,
                deltaX: deltaX,
                deltaY: deltaY,
                event: e
            });
        }
    }

    /**
     * mouseup 핸들러
     */
    handleMouseUp(e) {
        this.dragData.endX = e.clientX;
        this.dragData.endY = e.clientY;
        this.dragData.isDragging = false;

        console.log(`mouseup: (${e.clientX}, ${e.clientY})`);
        this.eventManager.emit('mouseup', {
            type: 'mouseup',
            x: e.clientX,
            y: e.clientY,
            event: e
        });
    }

    /**
     * 드래그 완료 콜백 (시퀀스 완료 시 호출)
     */
    onDragComplete(lastEventData) {
        const totalDeltaX = this.dragData.endX - this.dragData.startX;
        const totalDeltaY = this.dragData.endY - this.dragData.startY;
        const distance = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);

        console.log('%c=== DRAG COMPLETED ===', 'color: green; font-weight: bold;');
        console.log('Start:', `(${this.dragData.startX}, ${this.dragData.startY})`);
        console.log('End:', `(${this.dragData.endX}, ${this.dragData.endY})`);
        console.log('Total Delta:', `(${totalDeltaX}, ${totalDeltaY})`);
        console.log('Distance:', distance.toFixed(2));
        console.log('Last Event Data:', lastEventData);
        console.log('%c=======================', 'color: green; font-weight: bold;');
    }

    /**
     * 드래그 이벤트 리스너 추가
     * @param {function} callback - 드래그 완료 시 호출될 콜백
     */
    onDrag(callback) {
        this.eventManager.addCompositeListener(
            'customDrag',
            ['mousedown', 'mousemove', 'mouseup'],
            callback
        );
    }

    /**
     * 드래그 이벤트 리스너 제거
     */
    removeDragListener() {
        this.eventManager.removeCompositeListener('customDrag');
    }

    /**
     * 현재 드래그 데이터 반환
     */
    getDragData() {
        return { ...this.dragData };
    }
}

// 사용 예시
if (document.body) {
    const dragDebug = new DragDebug(document.body);

    // 커스텀 드래그 리스너 추가 예시
    dragDebug.onDrag((eventData) => {
        console.log('%c[Custom Drag Listener]', 'color: blue; font-weight: bold;', dragDebug.getDragData());
    });
}

export { DragDebug };
