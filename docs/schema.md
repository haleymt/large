# Schema Information

## publications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
description | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## followings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
followable_id   | integer   | not null, foreign key (references publications or users)
follower_id     | integer   | not null, foreign key (references users)
followable_type | string    | not null

## stories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
pub_id      | integer   | foreign key (references publications)
title       | string    | not null
subtitle    | string    |
body        | text      |
story_id    | integer   | foreign key (references stories, if story is a response)

## editings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
editor_id   | integer   | not null (references users)
pub_id      | integer   | not null (references publications)

## contributions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
writer_id   | integer   | not null (references users)
pub_id      | integer   | not null (references publications)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
taggable_id   | integer   | not null, foreign key (references stories or publications)
tag_id        | integer   | not null, foreign key (references tags)
taggable_type | string    | not null
