# Sample Node.js application

This repository is a sample Node.js application for Docker's documentation.<br/><br/>
Code and Documentation Reference [Node.js language-specific guide](https://docs.docker.com/language/nodejs/)<br/>
The guide does not contain code and walks you through the commands you need to perform for each course.

## Practice & Performance
### Dockerfile Image Layer
- ```docker run -p 3000:3000 img:tag```
- ```docker builder prune``` - 캐시 삭제
- 주석 한 줄 또는 패키지 추가 후 재빌드
1. package.json 분리하지 않고 빌드 - 198.63MB
    - 초기: 10.3s
    - 주석 + 재빌드: 5.0s
    - 패키지 + 재빌드: 6.1s
2. package.json 분리해서 빌드 - 243.38MB
    - 초기: 32.8s
    - 주석 + 재빌드: 0.8s
    - 패키지 + 재빌드 29.2s
3. package.json, package-lock.json 분리해서 빌드 - 197.57MB
    - 초기: 8.6s
    - 주석 + 재빌드: 0.4s
    - 패키지 + 재빌드: 5.6s
4. DB Volume 연결
    - ```compose.yaml```에 선언하여 postgres 컨테이너와 데이터를 volume으로 관리

#### Conclusion
1. 이미지 크기도 중요하지만 파일 하나에 따라서 빌드 시간에 큰 차이가 있을 수 있다.
2. 이미지 레이어 순서와 COPY 순서를 고려해야 한다.

이미지 최적화에서 고려해야할 것
- 크기: Base Image, Multi-stage, RUN 통합, Squash Image Layers, Install only what you need
- 빌드 시간: COPY 

### Dockerfile Optimization
- mount로 패키지, 캐시 분리, RUN 통합 - 164.91MB
    - 초기: 9.8s
    - 주석 + 재빌드: 0.8s
    - 패키지 + 재빌드: 4.3s

- MultiStage build 
    - Node.js 필수 - ```alpine:latest``` 활용 불가
    - 같은 ```node:${NODE_VERSION}-alpine``` 이미지를 활용으로 극적인 최적화 X

- ```docker scout```
    - NODE_VERSION 업데이트

#### Conclusion

- sync 주의
    ```
    `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
    ```

- Go 최적화
    - ```alpine``` 이미지로 멀티 스테이지 빌드가 가능한 정적 바이너리 파일을 활용하는 go 애플리케이션은 멀티 스테이지 빌드를 활용한 극적인 최적화가 가능할 것 같다.

### Docker Compose
- server, postgres 컨테이너 실행
- ```docker compose up/down```
- docker-compose vs docker compose
    - docker-compose -> docker copmose
    - docker cli에 통합

### Docker Swarm ➡️ Kubernetes
- docker push access denied
    - 로그인 확인
    - 이미지 태그 바꾸기
    ```docker tag SOURCE_IMAGE[:TAG] USERNAME/TARGET_IMAGE[:TAG]```
    -  ```docker push USERNAME/TARGET_IMAGE```

- 적용 - ```kubectl apply -f docker-node-k8s.yaml```
- 삭제 - ```kubectl delete -f docker-node-k8s.yaml```
- Scale
    ```kubectl scale --replicas=n deployment <deploymentname>```
    - describe 상태 상세 조회
    
## Reference
- [Docker optimization guide: 8 tricks to optimize your Docker image size](https://www.augmentedmind.de/2024/06/11/optimize-docker-image-size/)
- [Containerize a Node.js application](https://docs.docker.com/language/nodejs/containerize/)
- [How to Reduce Docker Image Size: 6 Optimization Methods](https://devopscube.com/reduce-docker-image-size/)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
