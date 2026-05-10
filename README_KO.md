# TastGPUBox - WebGPU 디버깅 프로젝트

## 개요
이 프로젝트는 포괄적인 WebGPU 타입 인식 및 디버깅 기능을 제공합니다. TypeScript 정의, 유틸리티 함수, 디버깅 도구를 포함하여 다양한 GPU 타입을 식별하고 작업하는 데 도움을 줍니다.

## 최신 업데이트

### 🎨 WebGPU 렌더링 파이프라인
- **커스텀 파이프라인 레이아웃**: 유니폼 버퍼를 위한 수동 바인드 그룹 레이아웃 구현
- **셰이더 시스템**: 유니폼 데이터 지원을 갖춘 별도의 버텍스 및 프래그먼트 셰이더
- **애니메이션 시스템**: 애니메이션된 유니폼(색상, 시간, 크기)으로 실시간 렌더링
- **버퍼 관리**: Loom 유틸리티를 통한 효율적인 GPU 버퍼 생성 및 관리

### 🔧 향상된 디버그 시스템
- **모듈식 디버그**: 플래그 제어를 갖춘 그라운드 기반 디버그 함수
- **클래스 관리**: 동적 클래스 등록을 위한 셰이더 클래스 푸시 시스템
- **타입 안전성**: GPUCanvasContext를 포함한 완전한 WebGPU 타입 정의
- **오류 처리**: 포괄적인 오류 보고 및 디버깅 유틸리티

### 📁 프로젝트 구조 업데이트
```
TastGPUBox/
├── debug_main/
│   ├── webGPU.js          # 메인 WebGPU 렌더링 시스템
│   ├── main.js            # 애니메이션을 포함한 애플리케이션 진입점
│   ├── shader_vertex.wgsl # 유니폼 지원을 갖춘 버텍스 셰이더
│   ├── shader_fragment.wgsl # 프래그먼트 셰이더
│   └── helloWorld.js      # UI 컴포넌트 시스템
├── debug_web/
│   ├── index.html         # 테스트 페이지
│   └── main.js           # 웹 진입점
├── shaderClass/
│   └── shaderClassPushClass.js # 동적 클래스 관리
├── types/
│   ├── webgpu.d.ts       # 완전한 WebGPU 타입 정의
│   └── readme.md         # 타입 문서
├── utils/
│   └── gpuTypeChecker.js # GPU 타입 확인 유틸리티
├── lib/
│   ├── lib.js           # 핵심 유틸리티 및 디버그 시스템
│   └── loom.js          # GPU 버퍼 관리
├── tsconfig.json        # TypeScript 설정
├── package.json         # Node.js 종속성
└── README.md           # 이 파일
```

## 기능

### 🎯 GPU 타입 인식
- WebGPU 지원 자동 감지
- GPU 어댑터 정보 추출
- 하드웨어 vs 폴백 어댑터 식별
- 상세한 오류 보고

### 🛠️ 개발 도구
- WebGPU 타입을 포함한 TypeScript 설정
- 타입 확인 유틸리티
- 그라운드 기반 디버그 로깅 시스템
- 브라우저 호환성 확인

### 🎨 렌더링 기능
- 커스텀 WebGPU 파이프라인 생성
- 유니폼 버퍼 관리
- 실시간 애니메이션 시스템
- 셰이더 기반 그래픽 렌더링

## 설정

### 전제 조건
- Node.js (v16 이상)
- WebGPU 지원을 갖춘 최신 브라우저 (WebGPU 플래그가 활성화된 Chrome/Edge)

### 설치

1. 종속성 설치:
```bash
npm install
```

2. 개발 서버 시작:
```bash
npm run dev
```

3. 브라우저를 열고 `http://localhost:8080`로 이동

## 사용법

### 기본 WebGPU 렌더링
```javascript
import WebGPUDebug from './debug_main/webGPU.js';

const webGPUDebug = new WebGPUDebug();
await webGPUDebug.init();

// 애니메이션 루프 시작
webGPUDebug.start();
```

### GPU 타입 확인
```javascript
import { GPUTypeChecker } from './utils/gpuTypeChecker.js';

// WebGPU 지원 확인
const support = GPUTypeChecker.checkWebGPUSupport();
console.log('WebGPU 지원:', support);

// GPU 타입 정보 가져오기
const gpuType = GPUTypeChecker.getGPUType();
console.log('GPU 타입:', gpuType);
```

### 버퍼 관리
```javascript
import { loom } from './lib/loom.js';

// GPU 버퍼 생성
const buffer = loom(device).createBuffer({
    buffer: new Float32Array([1, 2, 3, 4]),
    options: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
});
```

### 디버그 시스템
```javascript
import { getDebugGroundLog, getDebugGroundError } from './lib/lib.js';

const debugLog = getDebugGroundLog(true);
const debugError = getDebugGroundError(true);

debugLog('디버그 메시지');
debugError('오류 메시지');
```

## 셰이더 시스템

### 버텍스 셰이더 (shader_vertex.wgsl)
```wgsl
struct Uniforms {
    color: vec4<f32>,
    time: f32,
    size: f32,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
    let pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5)
    );
    return vec4<f32>(pos[vertexIndex] * uniforms.size, 0.0, 1.0);
}
```

### 프래그먼트 셰이더 (shader_fragment.wgsl)
```wgsl
struct Uniforms {
    color: vec4<f32>,
    time: f32,
    size: f32,
};

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@fragment
fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
    return uniforms.color;
}
```

## 애니메이션 시스템

프로젝트는 유니폼 값을 업데이트하는 실시간 애니메이션 시스템을 포함합니다:

```javascript
export function rendering(webGPUDebug) {
    let t = 0;
    const animate = () => {
        // 유니폼 업데이트
        webGPUDebug.uniform.time = t;
        webGPUDebug.uniform.color.r = Math.sin(t);
        webGPUDebug.uniform.color.g = Math.cos(t);
        webGPUDebug.uniform.color.b = Math.sin(t * 2);
        webGPUDebug.uniform.size = 0.5 + Math.sin(t) * 0.5;
        
        // 프레임 렌더링
        webGPUDebug.render();
        t += 0.02;
        
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}
```

## 브라우저 호환성

### 지원되는 브라우저
- Chrome 113+ (WebGPU 활성화)
- Edge 113+ (WebGPU 활성화)
- Firefox (실험적 지원)

### WebGPU 활성화
1. **Chrome/Edge**: 
   - `chrome://flags/`로 이동
   - "WebGPU" 플래그 활성화
   - 브라우저 재시작

2. **Firefox**:
   - `about:config`로 이동
   - `dom.webgpu.enabled`를 `true`로 설정
   - 브라우저 재시작

## GPU 타입

### 하드웨어 GPU
- 직접 하드웨어 가속
- 최고의 성능
- 완전한 기능 지원

### 폴백 GPU
- 소프트웨어 에뮬레이션
- 제한된 성능
- 기본 기능 세트

### GPU 지원 없음
- WebGPU 사용 불가
- WebGL 폴백 또는 대안 사용

## 문제 해결

### 일반적인 문제

1. **"WebGPU가 지원되지 않음"**
   - 브라우저 호환성 확인
   - WebGPU 플래그 활성화
   - 보안 컨텍스트 사용 (HTTPS/localhost)

2. **"GPU 어댑터 가져오기 실패"**
   - 그래픽 드라이버 업데이트
   - 하드웨어 호환성 확인
   - 폴백 어댑터 옵션 시도

3. **TypeScript 오류**
   - 종속성을 얻기 위해 `npm install` 실행
   - `tsconfig.json` 설정 확인
   - 타입 정의 확인

4. **셰이더 컴파일 오류**
   - WGSL 구문 확인
   - 유니폼 버퍼 레이아웃 확인
   - 적절한 바인딩 인덱스 확인

### 디버그 정보
`GPUTypeChecker.logGPUInfo()` 메서드는 포괄적인 디버그 출력을 제공합니다:
- WebGPU 지원 상태
- Navigator GPU 객체 가용성
- 어댑터 정보 (이름, 벤더, 아키텍처)
- 디바이스 생성 상태
- 오류 세부 정보

## 개발

### 빌드 명령
```bash
# TypeScript 빌드
npm run build

# 변경 사항 감시
npm run watch

# 개발 서버 시작
npm run serve
```

### 새 기능 추가
1. `types/webgpu.d.ts`에서 TypeScript 정의 업데이트
2. `utils/`에 유틸리티 함수 추가
3. `debug_main/webGPU.js`에서 메인 디버그 코드 업데이트
4. `debug_web/index.html`로 테스트

## 아키텍처

### WebGPU 파이프라인
1. **초기화**: GPU 어댑터 및 디바이스 생성
2. **파이프라인 설정**: 셰이더 모듈 및 파이프라인 레이아웃
3. **버퍼 관리**: 버텍스 및 유니폼 버퍼 생성
4. **렌더링**: 명령 인코딩 및 제출
5. **애니메이션**: 실시간 유니폼 업데이트

### 클래스 시스템
- **WebGPUDebug**: 메인 렌더링 클래스
- **Loom**: GPU 버퍼 관리 유틸리티
- **shaderClassPushClass**: 동적 클래스 등록
- **GPUTypeChecker**: GPU 기능 감지

## 라이선스
MIT 라이선스 - 자세한 내용은 LICENSE 파일 참조

## 기여
1. 리포지토리 포크
2. 기능 브랜치 생성
3. 풀 리퀘스트 제출

## 리소스
- [WebGPU 명세](https://gpuweb.github.io/gpuweb/)
- [WebGPU MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 셰이더 언어](https://gpuweb.github.io/gpuweb/wgsl/)
