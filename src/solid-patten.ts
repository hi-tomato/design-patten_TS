// // 좋지 않은 예시: 모든 로직이 UserService 클래스에 집중되어 있음 (SRP 위반)
// class UserService {
//   register(user: any) {
//     // 1. 회원가입 로직
//     fetch("/api/register", { 
//       // ...
//     })
//     // 2. 이메일 인증 로직
//     const emailService = new EmailService();

//     // 3. SMS 인증 로직
//     const smsService = new SMSService();
//   }
// }

// // 좋은 예시 (SRP 준수): 각 서비스가 자신의 책임에 집중하도록 분리
// class registerService {
//   fetchRegister(user: any) {
//     console.log('회원가입 로직');
//   }
// }

// class EmailService {
//   sendWelcomeEmail(name: string) {
//     console.log('환영 이메일을 보냅니다.');
//   }
// }

// class SMSService {
//   sendVerificationCode(phoneNumber: string) { 
//     console.log('SMS CODE를 보냅니다.');
//   }
// }

// class UserService2 {
//   constructor(
//     private registerService: registerService,
//     private emailService: EmailService,
//     private smsService: SMSService
//   ) {}

//   register(user: any) {
//     this.emailService.sendWelcomeEmail(user.name);
//     this.smsService.sendVerificationCode(user.phoneNumber);
//   }
// }

// //2. O: 개방 폐쇄 원칙 (OCP)
// // -> 확장에는 열려 있고, 수정에는 닫혀 있어야 한다. (기능 추가 시 기존 코드 수정 금지)

// // 좋지 않은 예시
// class Payments {
//   processPayments(paymentType: string, amount: number) {
//     if(paymentType === "KAKAO_PAY") {
//       console.log(`카카오페이로 ${amount}원을 결제합니다.`);
//     } else if (paymentType === "TOSS_PAY") {
//       console.log(`토스페이로 ${amount}원을 결제합니다.`);
//     }
//     // 새로운 결제 수단이 추가될 때마다 이 함수에 IF/ELSE 문이 추가되어야 한다. (OCP 위반)
//   }
// }

// interface PaymentMethod {
//   pay(amount: number): void;
// }

// class KakaoPay implements PaymentMethod {
//   pay(amount: number) {
//     console.log(`카카오페이로 ${amount}원을 결제합니다.`);
//   }
// }

// class TossPay implements PaymentMethod {
//   pay(amount: number) {
//     console.log(`토스페이로 ${amount}원을 결제합니다.`);
//   }
// }

// class Payments2 {
//   processPayments(paymentMethod: PaymentMethod, amount: number) {
//     paymentMethod.pay(amount)
//   }
// }


// 3. L: 리스코프 치환 원칙 (LSP)
// 자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 한다. (행동의 일관성)
// 좋지 않은 예시
// class BankAccount {
//   withdraw(amount: number) {
//     console.log(`${amount}원을 출금 완료하였습니다.`)
//   }
// }

// class FixedDepositAccount extends BankAccount {
//   withdraw(amount: number) {
//     // 🚨 정기예금은 만기 전에 출금이 안 되므로 에러를 던진다.
//     // 다른 코드에서 BankAccount인 줄 알고 썼다가 프로그램이 터질 수 있음.
//     throw new Error("고정 예금 계좌에서는 출금이 불가능합니다.");
//   }
// }

// // 좋은 예시
// class BankAccount2 {
//   // 공통 기능 (예: 입금, 잔액 조회 등)을 여기에 구현
//   deposit(amount: number) {
//     console.log(`${amount}원을 입금 완료하였습니다.`);
//   } 
// }

// // 출금이 가능한 계좌 그룹을 따로 생성한다. (리스코프 치환 원칙 준수)
// class WithdrawableBankAccount extends BankAccount2 {
//   withdraw(amount: number) {
//     console.log(`${amount}원을 출금 완료하였습니다.`);
//   }
// }

// class SavingsAccount extends WithdrawableBankAccount { /* 일반 예금은 출금 가능 */}
// class FixedDepositAccount2 extends BankAccount2 { /* 정기 예금은 출금 기능은 상속 받지 않는다. */}


// 4. I: 인터페이스 분리 원칙 (ISP)
// 인터페이스는 클라이언트가 자신이 사용하지 않는 메서드에 의존하지 않도록 분리되어야 한다. (인터페이스가 너무 크면 안 된다.)
// interface SmartPrinter {
//   print(): void;
//   scan(): void;
//   fax(): void;
// }

// class EconomicPrinter implements SmartPrinter {
//   print() { console.log("인쇄합니다."); }
//   scan() { console.log("스캔합니다."); }
//   fax() {
//     // 🚨 이 프린터는 팩스가 없는데 인터페이스 때문에 억지로 구현함
//     throw new Error("팩스 기능이 없습니다.");
//   }
// }

// interface Printer { print(): void; }
// interface Scanner { scan(): void; }
// interface Fax { fax(): void; }

// class EconomicPrinter2 implements Printer, Scanner {
//   print() { console.log("인쇄합니다."); }
//   scan() { console.log("스캔합니다."); }
// }

// class FaxMachine implements Fax {
//   fax() { console.log("팩스를 보냅니다."); }
// }