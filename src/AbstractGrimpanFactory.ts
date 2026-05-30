/**
 * @description singleton 패턴을 적용한 GrimpanFactory의 추상 클래스입니다.
 */
abstract class AbstractGrimpanFactory {
 static createGrimpan() {
  throw new Error('하위 클래스에서 구현하셔야 합니다.')
 } 
}

export default AbstractGrimpanFactory;