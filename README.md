# js-refactoring

## Javascript Refactoring

### #1

#### 1. amountFor

- for문안의 switch문을 메소드로 추출
- 메소드 추출
- 메소드 내 지역변수명, 파라미터 변경
- 인라인 수행

#### 2. playFor

- play정보 구하는 부분을 메소드로 추출
- 메소드 내 지역변수명, 파라미터 변경
- 인라인 수행

#### 3. volumeCreditsFor

- volumeCredits 구하는 부분을 메소드로 추출하기 쉽게 임시변수 사용
- 메소드 추출
- 메소드 내 지역변수명, 파라미터 변경
- 임시변수 삭제, 인라인 수행

#### 4. format함수

- 래핑함수로 변경
- 함수명 변경 usd
- 함수 파라미터 단위 수정

#### 5. totalVolumeCredits 추출

- for문 내 volumeCredits 부분 분리
- 메소드 내 지역변수명, 파라미터 변경
- 인라인 수행

#### 6. totalAmount 추출

- for문 내 totalAmount 부분 분리
- 메소드 내 지역변수명, 파라미터 변경
- 인라인 수행

### #2. html출력 기능 추가 요구 사항

#### 1. 계산과 출력부분을 분리

- 기존 statement 내부를 renderPlainText로 분리
- statementData 생성 후 rederPlainText의 인수로 추가
- statementData에 invoice의 customer
- statementData에 performances 데이터 확장(play, amount, volumeCredits)
- statementData에 totalAmount 저장
- statementData에 totalVolumeCredits 저장
- createStatementData 함수로 분리, 파일로 분리

#### 2. html출력 부분 추가

- 테스트 추가
- 함수 추가
- 테스트 수정

### #3. switch 분기에 로직 추가

1. PerformanceCalculator 클래스 추가
2. play, amount, volumeCredits 이동
3. createPerformanceCalculator 추가
4. Tregedy, Comedy Calculator 추가(amount, volumeCredits override)
5. total 함수 리팩토링(reduce)
