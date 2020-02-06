## 1강 구구단

- `tsc <FILENAME.ts>` 라고 치면 해당 파일이 컴파일 된 js 파일이 생성된다. 
- `tsc <FILENAME.ts> -w` `w` 는 watch 의 줄임말. 파일이 변경될때마다 js 파일을 생성해준다.
- ts 확장자를 가지고 있는 파일은 굳이 type 을 사용하지 않아도 VScode 가 lint 해주기 때문에 도움이 된다.

## 3강 가위, 바위, 보

#### Interface and Type

- `Interface`는 같은 이름으로 선언할 수 있다. 
- `Interface`는 따로 선언하여도 같은 이름이라면 합쳐진다.
- 남의 라이브러리에서 문제가 있거나 추가하고 싶을 때 추가/수정할 수 있음.
- `Type`은 같은 이름으로 선언할 수 없다.
- `Interface`보다 `Type` 이 더 넓은 범위.
- `Interface`는 주로 `객체`에 많이 사용하고 
- `Type`은 객체가 될 수도 있고 다른 게 될 수도 있다.
- 새로 Type 을 만들 수 있다. 예를 들면 `type Hello = string | number;`
- interface 객체의 `key`가 확실하지 않을 때에는 `[key: string] : number` 과 같은 방법으로 대체할 수 있다. (웬만하면 쓰지 않겠죠?)

## 4강 자스스톤

#### Interface

- `tsconfig.json` 에서 `strictNullChecks` 는 `strict` 의 값을 default 로 갖는다.
- 타입 key 에 `?` 를 붙이면 `not required` 가 된다. 
- `?` 는 `undefined` 를 의미한다. ex) `key?: string` === `key : string | undefined`

#### Class

- `public` : 나, 내 자식, 내 인스턴스에서 모두 접근 가능
- `protected` : 내 클래스와 나를 상속받은 자식들에게 사용 가능
- `private` : 내 클래스 안에서만 속성을 사용 가능
- `public`만이 부모 implement (`interface` or `type`)에서 접근이 가능하다.

#### Generic

- `<>` 꺽쇠로 표현하며, 이름은 개발자가 정한다. 좀 더 자유로운 범위의 타입을 설정한다.
- 제네릭의 타입은 **사용할 때** 선언해줄 수 있다. `마치 함수의 매개변수와 인자의 모습으로 느껴졌다.`
- Generic 에도 제약을 둘 수 있는데 그 때 `extends` 를 사용한다.
- ex) `interface object<T extends string>`