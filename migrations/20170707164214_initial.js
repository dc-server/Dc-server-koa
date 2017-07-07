
exports.up = async function(db) {
  await db.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('username', 100).notNullable()
    t.string('password', 100).notNullable()
    t.string('email', 50)
    t.string('avatar_url', 200)
    t.timestamps()
    t.integer('status').defaultTo(1)
    t.unique('username')
  })
  await db.schema.createTable('posts', t => {
    t.increments('id').primary()
    t.string('title', 100).notNullable()
    t.text('description')
    t.text('content')
    t.integer('author_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('status').defaultTo(1)
    t.timestamps()
    t.unique('title')
  })
  await db.schema.createTable('videos', t => {
    t.increments('id').primary()
    t.string('title', 100).notNullable()
    t.text('description')
    t.string('link').notNullable()
    t.integer('author_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('status').defaultTo(1)
    t.timestamps()
    t.unique('title')
  })
};

exports.down = async function(db) {
  await db.schema.dropTableIfExists('posts')
  await db.schema.dropTableIfExists('videos')
  await db.schema.dropTableIfExists('users')
};
