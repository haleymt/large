json.partial!("user", user: @user)

json.stories do
  json.array!(@user.stories) do |story|
    json.partial! 'api/stories/story', story: story
  end
end
