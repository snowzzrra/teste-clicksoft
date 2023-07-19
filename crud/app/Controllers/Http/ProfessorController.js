'use strict'
const Professor = use("App/Models/Professor");
const Sala = use("App/Models/Sala");
const Aluno = use("App/Models/Aluno");

class ProfessorController {
  async index ({ request, response, view }) {
    const professores = await Professor.all();
    return professores;
  }
  async store ({ request, response }) {
    const data = request.only(["nome", "email", "matricula", "dataNasc"]);
    const professor = await Professor.create(data);
    return professor;
  }
  async update ({ params, request, response }) {
    const professor = await Professor.find(params.id);
    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const data = request.only(["nome", "email", "matricula", "dataNasc"]);

    professor.merge(data);
    await professor.save();

    return professor;
  }
  async destroy ({ params, request, response }) {
    const professor = await Professor.find(params.id);
    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    await professor.delete();
    return { message: 'Professor deletado com sucesso.'}
  }

  async show ({ params, request, response, view }) {
    const professor = await Professor.find(params.id);
    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }
    
    return professor;
  }

  async createSala ({ params, request, response }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const data = request.only(['numeroSala', 'capacidadeMax', 'podeAlocarAluno'])
    data.professor_id = params.id
    const sala = await Sala.create(data)

    return sala
  }

  async updateSala ({ params, request, response }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const data = request.only(['numeroSala', 'capacidadeMax', 'podeAlocarAluno'])
    const sala = await Sala.find(params.sala_id)

    if (!sala || sala.professor_id !== professor.id) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    sala.merge(data)
    await sala.save()

    return sala
  }

  async deleteSala ({ params, request, response }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const sala = await Sala.find(params.sala_id)

    if (!sala || sala.professor_id !== professor.id) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    await sala.delete()

    return { message: 'Sala excluída com sucesso.' }
  }

  async showSala ({ params, request, response, view }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const sala = await Sala.query().where('id', params.sala_id).where('professor_id', professor.id).first()

    if (!sala) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    return sala
  }

  async allocateAluno ({ params, request, response }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const sala = await Sala.query()
      .where('id', params.sala_id)
      .where('professor_id', professor.id)
      .first()

    if (!sala) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    if (sala.capacidadeMax <= await sala.alunos().getCount() || !sala.podeAlocarAluno) {
      return { message: 'Sala já está cheia ou não aceita alunos.' }
    }

    const aluno = await Aluno.find(params.aluno_id)

    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    const alunoJaAlocado = await sala.alunos().where('aluno_id', aluno.id).first();

    if (alunoJaAlocado) {
      return { message: 'Aluno já está alocado nesta sala.' };
    }

    await sala.alunos().attach(aluno.id)

    return { message: 'Aluno alocado na sala com sucesso.' }
  }

  async removeAluno ({ params, request, response }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const sala = await Sala.query().where('id', params.sala_id).where('professor_id', professor.id).first()

    if (!sala) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    const aluno = await Aluno.find(params.aluno_id)

    if (!aluno) {
      return { message: 'Aluno não encontrado.' }
    }

    await sala.alunos().detach([aluno.id])

    return { message: 'Aluno removido da sala com sucesso.' }
  }

  async listAlunosSala ({ params, request, response, view }) {
    const professor = await Professor.find(params.id)

    if (!professor) {
      return { message: 'Professor não encontrado.' }
    }

    const sala = await Sala.query().where('id', params.sala_id).where('professor_id', professor.id).first()

    if (!sala) {
      return { message: 'Sala não encontrada ou não pertence a este professor.' }
    }

    const alunos = await sala.alunos().fetch()

    return alunos
  }
}

module.exports = ProfessorController
