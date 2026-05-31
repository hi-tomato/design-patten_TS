/** [AbstractGrimpan]
 * @description
 * 1. 추상 그림판을 생성합니다.
 * 2. 상속 받은 그림판에는 초기화 메서드와, 초기화 메뉴 메서드를 구현해야 합니다.
 * 3. 싱글톤 패턴을 적용하여, getInstance 메서드를 통해 인스턴스를 반환합니다.
 * */

export default abstract class Grimpan {
  protected constructor(canvas: HTMLCanvasElement | null) {
    if(!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element not found');
    }
  }

  abstract initialize(): void;

  static getInstance() {}
}

