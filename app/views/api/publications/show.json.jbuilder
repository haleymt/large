json.partial!("pub", pub: @pub)

json.stories do
  json.array!(@pub.stories) do |story|
    json.partial! 'api/stories/story', story: story
  end
end

json.follows do
  json.array!(@pub.follows) do |follow|
    json.partial! 'api/follows/follow', follow: follow
  end
end

json.editors do
  json.array!(@pub.editors) do |editor|
    json.partial! 'api/users/user', user: editor
  end
end

json.writers do
  json.array!(@pub.writers) do |writer|
    json.partial! 'api/users/user', user: writer
  end
end

json.pub_edits do
  json.array!(@pub.pub_edits) do |pub_edit|
    json.partial! 'api/pub_edits/pubedit', pubedit: pub_edit
  end
end

json.pub_writes do
  json.array!(@pub.pub_writes) do |pub_write|
    json.partial! 'api/pub_writes/pubwrite', pubwrite: pub_write
  end
end

json.followers do
  json.array!(@pub.followers) do |follower|
    json.partial! 'api/users/user', user: follower
  end
end

json.taggings do
  json.array!(@pub.taggings) do |tagging|
    json.partial! 'api/taggings/tagging' tagging: tagging
  end
end

json.tags do
  json.array!(@pub.tags) do |tag|
    json.partial! 'api/tags/tag', tag: tag
  end
end
