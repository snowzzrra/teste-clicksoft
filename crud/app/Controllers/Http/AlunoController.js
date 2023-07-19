'use strict'
const Aluno = use("App/Models/Aluno");
const Sala = use("App/Models/Sala");
const Professor = use("App/Models/Professor");

class AlunoController {
  async index ({ request, response, view }) {
    const alunos = await Aluno.all();
    return alunos;
  }
  async store ({ request, response }) {
    const data = request.only(["nome", "email", "matricula", "dataNasc"]);
    const aluno = await Aluno.create(data);
    return aluno;
  }
  async update ({ params, request, response }) {
    const aluno = await Aluno.find(params.id);
    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    const data = request.only(["nome", "email", "matricula", "dataNasc"]);

    aluno.merge(data);
    await aluno.save();

    return aluno;
  }
  async destroy ({ params, request, response }) {
    const aluno = await Aluno.find(params.id);
    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    await aluno.delete();
    return {message: "Aluno deletado com sucesso"}
  }

  async show ({ params, request, response, view }) {
    const aluno = await Aluno.find(params.id);
    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    return aluno;
  }

  async listSalas ({ params, request, response, view }) {
    const aluno = await Aluno.find(params.id);
    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }
    
    const salas = await aluno.salas().fetch()
    return salas
  }

  async listSalasComparecer ({ params, request, response, view }) {
    const aluno = await Aluno.find(params.id)

    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    const salasDoAluno = await aluno.salas().fetch();

    // Mapear as informações desejadas de cada sala
    const salasInfo = await Promise.all(
      salasDoAluno.rows.map(async (salaDoAluno) => {
        const sala = await Sala.find(salaDoAluno.id);

        // Obter o professor da sala
        const professor = await Professor.find(sala.professor_id);

        return {
          nomeAluno: aluno.nome,
          professor: {
            nome: professor.nome,
            numeroSala: sala.numeroSala,
          },
        };
      })
    );

    return salasInfo;
  }
}

module.exports = AlunoController
