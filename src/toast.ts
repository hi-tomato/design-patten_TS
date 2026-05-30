// 모든 토스트가 지켜야 할 규격을 정의합니다.
interface Toast {
  show(): void;
}

// 구체적인 토스트의 제품을 정의합니다.
export class SuccessToast implements Toast {
  show() {
    console.log("🟢 [성공] 요청이 정상적으로 처리되었습니다.")
  }
}

export class ErrorToast implements Toast {
  show() {
    console.log("🔴 [실패] 요청이 정상적으로 처리되지 않았습니다.")
  }
}

export class WarningToast implements Toast {
  show() {
    console.log("🟡 [경고] 주의가 필요한 상황입니다.")
  }
}

export class InfoToast implements Toast {
  show() {
    console.log("🔵 [정보] 추가적인 정보입니다.")
  }
}