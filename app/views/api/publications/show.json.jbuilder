json.partial!("pub", pub: @pub)

@pub.stories do
  json.array!(@pub.stories) do |story|
    json.partial! 'stories/story', story: story
  end
end
