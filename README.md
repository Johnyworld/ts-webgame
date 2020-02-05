## 1강 구구단

- `tsc <FILENAME.ts>` 라고 치면 해당 파일이 컴파일 된 js 파일이 생성된다. 
- `tsc <FILENAME.ts> -w` `w` 는 watch 의 줄임말. 파일이 변경될때마다 js 파일을 생성해준다.
- ts 확장자를 가지고 있는 파일은 굳이 type 을 사용하지 않아도 VScode 가 lint 해주기 때문에 도움이 된다.

## 3강 가위, 바위, 보

### Interface and Type

- `Interface`는 같은 이름으로 선언할 수 있다. 
- `Interface`는 따로 선언하여도 같은 이름이라면 합쳐진다.
- 남의 라이브러리에서 문제가 있거나 추가하고 싶을 때 추가/수정할 수 있음.
- `Type`은 같은 이름으로 선언할 수 없다.
- `Interface`보다 `Type` 이 더 넓은 범위.
- `Interface`는 주로 `객체`에 많이 사용하고 
- `Type`은 객체가 될 수도 있고 다른 게 될 수도 있다.
- 새로 Type 을 만들 수 있다. 예를 들면 `type Hello = string | number;`
- interface 객체의 `key`가 확실하지 않을 때에는 `[key: string] : number` 과 같은 방법으로 대체할 수 있다. (웬만하면 쓰지 않겠죠?)