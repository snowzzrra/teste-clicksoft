'use strict'
const Aluno = use("App/Models/Aluno");

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
    const aluno = await Aluno.findOrFail(params.id);
    const data = request.only(["nome", "email", "matricula", "dataNasc"]);

    aluno.merge(data);
    await aluno.save();

    return aluno;
  }
  async destroy ({ params, request, response }) {
    const aluno = await Aluno.findOrFail(params.id);
    await aluno.delete();
  }
}

module.exports = AlunoController
