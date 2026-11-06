# LIGHT RULES

픽셀 스타일의 모바일 광학 퍼즐 게임입니다. 반사경으로 두꺼운 네온 광선을 같은 색의 수광기에 연결합니다.

## 로컬 실행

정적 파일 서버로 이 폴더를 열면 됩니다. 예: `npx serve .`

## 배포

Cloudflare Pages에서 이 GitHub 저장소를 연결하고 다음 값을 사용합니다.

- Framework preset: `None`
- Build command: 비워 둠
- Build output directory: `/`

`main` 브랜치에 커밋을 올릴 때마다 자동 배포됩니다. 배포할 때 `version.json` 값을 변경하면 열려 있는 게임이 60초 안에 새 버전을 감지해 새로고침 버튼을 보여줍니다.
