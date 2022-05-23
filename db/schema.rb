# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2015_04_17_192443) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "follows", force: :cascade do |t|
    t.integer "followable_id"
    t.integer "follower_id"
    t.string "followable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "publication_edits", force: :cascade do |t|
    t.integer "editor_id", null: false
    t.integer "pub_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["editor_id"], name: "index_publication_edits_on_editor_id"
    t.index ["pub_id"], name: "index_publication_edits_on_pub_id"
  end

  create_table "publication_writes", force: :cascade do |t|
    t.integer "writer_id", null: false
    t.integer "pub_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pub_id"], name: "index_publication_writes_on_pub_id"
    t.index ["writer_id"], name: "index_publication_writes_on_writer_id"
  end

  create_table "publications", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "title", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "header_image"
    t.text "icon_image"
    t.string "header_align"
    t.index ["owner_id"], name: "index_publications_on_owner_id"
  end

  create_table "stories", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "pub_id"
    t.string "title"
    t.string "subtitle"
    t.text "body"
    t.integer "story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "header_image"
    t.index ["author_id"], name: "index_stories_on_author_id"
    t.index ["pub_id"], name: "index_stories_on_pub_id"
    t.index ["story_id"], name: "index_stories_on_story_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.integer "taggable_id", null: false
    t.integer "tag_id", null: false
    t.string "taggable_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "label", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.text "header_image"
    t.text "icon_image"
  end

end
