json.partial!("story", story: @story)

json.tags do
  json.array!(@story.tags) do |tag|
    json.partial! 'api/tags/tag', tag: tag
  end
end
