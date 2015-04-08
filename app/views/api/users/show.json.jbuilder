json.partial!("user", user: @user)

json.stories do
  json.array!(@user.stories) do |story|
    json.partial! 'api/stories/story', story: story
  end
end

json.publications do
  json.array!(@user.publications) do |pub|
    json.partial! 'api/publications/pub', pub: pub
  end
end
