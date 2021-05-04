import employeeSaga from "./employee";

export default function* rootSaga() {
  yield [employeeSaga()];
}
