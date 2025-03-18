const Banco = require("../src/banco");

describe("Testes da classe Banco", () => {
  let conta;
  let contaDestino;

  beforeEach(() => {
    conta = new Banco("Gustavo", 30)
    contaDestino = new Banco("João", 400)
  })

  test("Depositar", async () => {
    expect(conta.depositar(5)).toBe(35);
  });

  test("Sacar", async () => {
    expect(conta.sacar(10)).toBe(25);
  });

  test("Transferir", async () => {
    expect(conta.transferir(10, contaDestino));
  });

  test("Obter Saldo", async () => {
    expect(conta.obterSaldo()).toBe(15);
    expect(contaDestino.obterSaldo()).toBe(410);
  });

  test("Obter Histórico", async () => {
    expect(conta.obterHistorico()).toEqual(expect.arrayContaining([
      { tipo: 'Depósito', valor: 5 },
      { tipo: 'Saque', valor: 10 },
      { tipo: 'Transferência', valor: 10, destino: 'João' },
    ]))
  });

  test("Definir Limite de Saque", async () => {
    expect(conta.definirLimiteDeSaque(15))
  });

  test("Verificar Limite de Saque", async () => {
    expect(conta.verificarLimiteDeSaque(10)).toBeTruthy()
    expect(() => conta.verificarLimiteDeSaque(20)).toThrow("Saldo insuficiente")
  });

  test("Aplicar Juros", async () => {
    expect(conta.aplicarJuros(5)).toBe(14.25)
  });

  test("Pagar Conta", async () => {
    expect(conta.pagarConta(10, "Luz")).toBe(4.25)
  });

  test("Obter Total Depositado", async () => {
    expect(conta.obterTotalDepositado()).toBe(5)
  });
});
