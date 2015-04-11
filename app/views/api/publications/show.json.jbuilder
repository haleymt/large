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
