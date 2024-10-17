## Probe

애플리케이션의 안정적인 운영과 무중단배포에 반드시 필요

### startup probe

컨테이너가 초기화 및 시작되는 동안 기다림

### liveness probe

컨테이너가 정상적으로 실행 중인지를 확인

### readiness probe

컨테이너가 클라이언트 트래픽을 받을 준비가 되었는지 확인

## 정상/비정상 테스트를 위한 설정

상위 폴더의 k8s-probe-pod.yaml에서 각 probe의 엔드포인트를 `/bad`로 변경한다.
`/healthz`는 200을 반환하며 `/bad`는 400을 반환한다.
