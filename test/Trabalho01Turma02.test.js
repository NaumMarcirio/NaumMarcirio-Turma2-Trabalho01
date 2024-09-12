const Biblioteca = require("../src/Trabalho01Turma02");

describe("Biblioteca", () => {
  let biblioteca;
  let livro1;
  let livro2;
  let membro1;

  beforeEach(() => {
    biblioteca = new Biblioteca();
    livro1 = {
      id: 1,
      titulo: "Harry Potter",
      autor: "J.K. Rowling",
      genero: "Fantasia",
      ano: 2000,
      emprestado: false,
    };
    livro2 = {
      id: 2,
      titulo: "Percy Jackson",
      autor: "Rick Riordan",
      genero: "Aventura",
      ano: 2003,
      emprestado: false,
    };
    membro1 = { id: 1, nome: "Naum" };
  });

  //Adicionar//
  /////////////////////////////////////////////////////////////////////////////
  test("Adicionar um Livro à lista de livros", () => {
    biblioteca.adicionarLivro(livro1);
    expect(biblioteca.listarLivros()).toContain(livro1);
  });

  test("Adicionar um Membro à lista de membros", () => {
    biblioteca.adicionarMembro(membro1);
    expect(biblioteca.listarMembros()).toContain(membro1);
  });

  //Remover//
  /////////////////////////////////////////////////////////////////////////////

  test("Remover um livro da lista de livros", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.removerLivro(livro1.id);
    expect(biblioteca.listarLivros()).not.toContain(livro1);
  });

  test("Remover um membro da lista de membros", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.removerMembro(membro1.id);
    expect(biblioteca.listarMembros()).not.toContain(membro1);
  });

  test("Remover um livro que não existe", () => {
    biblioteca.removerLivro(100);
    expect(biblioteca.listarLivros()).toHaveLength(0);
  });

  test("Remover um membro que não existe", () => {
    biblioteca.removerMembro(100);
    expect(biblioteca.listarMembros()).toHaveLength(0);
  });

  //BUSCAR//
  /////////////////////////////////////////////////////////////////////////////

  test("Buscar o livro pelo seu ID", () => {
    biblioteca.adicionarLivro(livro1);
    const livro = biblioteca.buscarLivroPorId(livro1.id);
    expect(livro).toBe(livro1);
  });

  test("Buscar o livro pelo seu título", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const livros = biblioteca.buscarLivroPorTitulo("Harry");
    expect(livros).toContain(livro1);
    expect(livros).not.toContain(livro2);
  });

  test("Buscar um membro pelo seu ID", () => {
    biblioteca.adicionarMembro(membro1);
    const membro = biblioteca.buscarMembroPorId(membro1.id);
    expect(membro).toBe(membro1);
  });

  test("Buscar um membro pelo seu Nome", () => {
    biblioteca.adicionarMembro(membro1);
    const membro = biblioteca.buscarMembroPorNome(membro1.nome);
    expect(membro.nome).toBe("Naum");
  });

  test("Buscar livro com ID nulo ou indefinido", () => {
    biblioteca.adicionarLivro(livro1);
    const livro = biblioteca.buscarLivroPorId(null);
    expect(livro).toBeUndefined();
    const livroInvalido = biblioteca.buscarLivroPorId(undefined);
    expect(livroInvalido).toBeUndefined();
  });

  //LISTAR//
  /////////////////////////////////////////////////////////////////////////////

  test("Listar todos os livros", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const livros = biblioteca.listarLivros();
    expect(livros).toContain(livro1);
    expect(livros).toContain(livro2);
  });

  test("Listar todos os membros", () => {
    biblioteca.adicionarMembro(membro1);
    const membros = biblioteca.listarMembros();
    expect(membros).toContain(membro1);
  });

  test("Listar todos os livros (Emprestados)", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarMembro(membro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    const livrosEmprestados = biblioteca.listarLivrosEmprestados();
    expect(livrosEmprestados).toContain(livro1);
    expect(livrosEmprestados).not.toContain(livro2);
  });

  test("Listar todos os livros (Disponíveis) ", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarMembro(membro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    const livrosDisponiveis = biblioteca.listarLivrosDisponiveis();
    expect(livrosDisponiveis).toContain(livro2);
    expect(livrosDisponiveis).not.toContain(livro1);
  });

  test("Listar os livros por autor específico", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const livrosDoAutor = biblioteca.listarLivrosPorAutor("J.K. Rowling");
    expect(livrosDoAutor).toContain(livro1);
    expect(livrosDoAutor).not.toContain(livro2);
  });

  test("Listar livros por gênero específico", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const livrosDoGenero = biblioteca.listarLivrosPorGenero("Fantasia");
    expect(livrosDoGenero).toContain(livro1);
    expect(livrosDoGenero).not.toContain(livro2);
  });

  test("Listar livros por Ano específico", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const livrosDoAno = biblioteca.listarLivrosPorAno(2000);
    expect(livrosDoAno).toContain(livro1);
    expect(livrosDoAno).not.toContain(livro2);
  });

  //EMPRESTAR//
  /////////////////////////////////////////////////////////////////////////////

  test("Emprestar o livro e marcar ele como (Emprestado)", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarMembro(membro1);
    const emprestado = biblioteca.emprestarLivro(livro1.id, membro1.id);
    expect(emprestado).toBe(true);
    expect(livro1.emprestado).toBe(true);
    expect(livro1.idMembro).toBe(membro1.id);
  });

  test("Emprestar um livro já emprestado", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarMembro(membro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    const emprestadoNovamente = biblioteca.emprestarLivro(
      livro1.id,
      membro1.id
    );
    expect(emprestadoNovamente).toBe(false);
  });

  //DEVOLVER//
  /////////////////////////////////////////////////////////////////////////////

  test("Devolver o livro e marcar ele como (Disponível)", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarMembro(membro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    const devolvido = biblioteca.devolverLivro(livro1.id);
    expect(devolvido).toBe(true);
    expect(livro1.emprestado).toBe(false);
    expect(livro1.idMembro).toBeUndefined();
  });

  test("Devolver um livro que não está emprestado", () => {
    biblioteca.adicionarLivro(livro1);
    const devolvido = biblioteca.devolverLivro(livro1.id);
    expect(devolvido).toBe(false);
  });

  //CONTAR//
  /////////////////////////////////////////////////////////////////////////////

  test("Contar o número total de livros", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    const totalLivros = biblioteca.contarLivros();
    expect(totalLivros).toBe(2);
  });

  test("Contar o número total de membros", () => {
    biblioteca.adicionarMembro(membro1);
    const totalMembros = biblioteca.contarMembros();
    expect(totalMembros).toBe(1);
  });

  //ATUALIZAR//
  /////////////////////////////////////////////////////////////////////////////

  test("Atualizar as informações do livro", () => {
    biblioteca.adicionarLivro(livro1);
    const novosDados = {
      titulo: "Harry Potter e a Câmara Secreta",
      autor: "J.K. Rowling",
    };
    biblioteca.atualizarInformacaoLivro(livro1.id, novosDados);
    const livroAtualizado = biblioteca.buscarLivroPorId(livro1.id);
    expect(livroAtualizado.titulo).toBe(novosDados.titulo);
    expect(livroAtualizado.autor).toBe(novosDados.autor);
  });

  test("Garantir que o objeto livro não seja Atualizado fora da função", () => {
    const livroOriginal = { ...livro1 };
    biblioteca.adicionarLivro(livro1);
    expect(livro1).toEqual(livroOriginal);
  });

  test("Tentar atualizar um livro que não existe", () => {
    const novoLivro = {
      titulo: "Livro da vida do Naum",
      autor: "Naum",
    };
    biblioteca.atualizarInformacaoLivro(100, novoLivro);
    expect(biblioteca.listarLivros()).toHaveLength(0);
  });
});
