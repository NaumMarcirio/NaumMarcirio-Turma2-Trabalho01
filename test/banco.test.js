const Banco = require("../src/banco"); // ajuste o caminho conforme necessário

describe("Banco", () => {
  let conta;

  beforeEach(() => {
    // Executado antes de cada teste para começar com estado limpo
    conta = new Banco("Naum", 100); // Nome da conta e saldo inicial
  });

  //teste depósito na conta
  test("deve depositar dinheiro na conta", () => {
    const saldoAtual = conta.depositar(50);
    expect(saldoAtual).toBe(150);
    expect(conta.obterHistorico()).toContainEqual({
      tipo: "Depósito",
      valor: 50,
    });
  });

  //teste de saque da conta
  test("deve sacar dinheiro da conta", () => {
    const saldoAtual = conta.sacar(30);
    expect(saldoAtual).toBe(70);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Saque", valor: 30 });
  });

  //teste para caso a pessoa tente sacar mais doque tem na conta
  test("deve lançar erro ao tentar sacar mais do que o saldo disponível", () => {
    expect(() => conta.sacar(200)).toThrow("Saldo insuficiente");
  });

  //teste para transferir dinheiro para outra conta
  test("deve transferir dinheiro para outra conta", () => {
    const contaDestino = new Banco("Conta Destino", 100);
    conta.transferir(50, contaDestino);

    expect(conta.obterSaldo()).toBe(50);
    expect(contaDestino.obterSaldo()).toBe(150);
    expect(conta.obterHistorico()).toContainEqual({
      tipo: "Transferência",
      valor: 50,
      destino: "Conta Destino",
    });
  });

  //teste aplicar juros ao saldo
  test("deve aplicar juros ao saldo", () => {
    const saldoAtual = conta.aplicarJuros(10); // aplica 10% de juros
    expect(saldoAtual).toBe(110);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Juros", valor: 10 });
  });

  //teste pagar uma conta
  test("deve pagar uma conta", () => {
    const saldoAtual = conta.pagarConta(40, "Conta de Luz");
    expect(saldoAtual).toBe(60);
    expect(conta.obterHistorico()).toContainEqual({
      tipo: "Pagamento",
      valor: 40,
      descricao: "Conta de Luz",
    });
  });

  //teste definir limite saque
  test("deve definir limite de saque", () => {
    conta.definirLimiteDeSaque(50);
    expect(conta.limiteDeSaque).toBe(50);
  });

  //teste lançar erro caso tente sacar acima do limite
  test("deve lançar erro ao tentar sacar acima do limite definido", () => {
    conta.definirLimiteDeSaque(50);
    expect(() => conta.verificarLimiteDeSaque(60)).toThrow(
      "Saque acima do limite permitido"
    );
  });

  //teste do calculo do total depositado
  test("deve calcular o total depositado", () => {
    conta.depositar(50);
    conta.depositar(20);
    expect(conta.obterTotalDepositado()).toBe(70);
  });

  //teste para retornar saldo atual
  test("deve retornar o saldo atual", () => {
    expect(conta.obterSaldo()).toBe(100);
  });
});
