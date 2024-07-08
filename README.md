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

#### Conclusion
1. 이미지 크기도 중요하지만 파일 하나에 따라서 빌드 시간에 큰 차이가 있을 수 있다.
2. 이미지 레이어 순서와 COPY 순서를 고려해야 한다.

이미지 최적화에서 고려해야할 것
- 크기: Base Image, Multi-stage, RUN 통합, Squash Image Layers, Install only what you need
- 빌드 시간: COPY 

### Dockerfile Optimization
1. mount로 캐싱 분리
2. 결과 비교

### Docker Compose
### Docker Swarm

## Reference
- [Docker optimization guide: 8 tricks to optimize your Docker image size](https://www.augmentedmind.de/2024/06/11/optimize-docker-image-size/)
- [Containerize a Node.js application](https://docs.docker.com/language/nodejs/containerize/)
- [How to Reduce Docker Image Size: 6 Optimization Methods](https://devopscube.com/reduce-docker-image-size/)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
