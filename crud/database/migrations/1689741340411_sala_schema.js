'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalaSchema extends Schema {
  up () {
    this.create('salas', (table) => {
      table.increments()
      table.integer("numeroSala").notNullable()
      table.integer("capacidadeMax").notNullable()
      table.boolean("podeAlocarAluno").notNullable()
      table.integer("professor_id").unsigned().references("id").inTable("professors").onDelete("cascade")
      table.timestamps()
    })
  }

  down () {
    this.drop('salas')
  }
}

module.exports = SalaSchema
