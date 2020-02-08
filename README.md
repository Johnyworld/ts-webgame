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

## 5강 모듈시스템

- `module.exports = { a고 'bla', b: 4 }` 로 내보낸 것은 `const aa = require('./file.js')` 로 받아주고
- `exports.a = "bla bla"` 로 내보낸 것은 `const { a } = require('./file.js')` 로 받아준다.

#### Definitely Types

- Definitely Types를 설치하는 방법은 ex) `yarn add @types/jquery` 
- `namespace` 로 정의 한 애들은 이와 같이 불러올 수 있다. ex) `React.Component`
- `export = React` 이렇게 export 된 애들은 common.js 방식으로 export 된 것이기 때문에 `import * as React from 'react'` 이 방법으로 import 해야 한다.
- index.d.ts 를 참고하기 좋은 라이브러리들 : redux, axios, react, jquery
- d.ts 는 남의 모듈을 위해 쓰고 내꺼 쓸땐 ts 쓰면 됨.

#### Making Custom types for packages

유명하지 않은 패키지들은 누군가 만들어놓은 타입이 없을 수도 있다. 그렇다면 직접 타입을 만들어줘야 한다.

1. `types` 와 같은 폴더명으로 폴더를 만든다.
2. `tsconfig.json`파일에 - compilerOptions - `typeRoots : [ "./types" ]`를 추가해준다.
3. types 폴더 안에 `<EXTENTION-NAME.d.ts>`파일을 만든다.
4. 아래 코드와 같이 export 한다. export 하는 방법은 다른 익스텐션들을 참고하여 작성한다.
   
```
declare module 'the-extention' {
    const theExtention: boolean;
    export default theExtention;
}
```

#### Adding method to window object (and Error object)

window 객체에 method 를 추가하여 사용하는 것은 기존 자바스크립트에서는 크게 문제가 없다. 하지만 typescript 에서는 오류가 발생한다. 하지만 사용할 수 없는 것은 아니다.

1. ./types/index.d.ts (파일명은 중요하지 않음) 에 전역객체로 선언한다. declare global { ... }
2. export interface Window { hello: string } 이런식으로 추가해준다.
3. export interface Error { code?: any } 에러는 이런 식으로.
4. Augmentation ... 오류가 발생할때는 꼼수로 최상단에 export {} 를 넣어주어 external module 로 만들어 주면 에러가 나지 않는다.

```
export {}
declare global {
    export interface Window {
        hello: string
    }

    export interface Error {
        code?: any
    }
}
```

#### Modifying types for extentions have wrong types

누군가 만들어 놓은 익스텐션을 사용 할 때, types 가 틀린 경우가 가끔 있다. 그럴 경우에는 해당하는 @types(definitly typed) 를 그대로 복사하여 local 에서 수정하여 사용한다. 해당 익스텐션의 @types는 삭제한다.




