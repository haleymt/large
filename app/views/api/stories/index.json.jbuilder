json.array!(@stories) do |story|
  json.partial! 'api/stories/story', story: story

  json.taggings do
    json.array!(story.taggings) do |tagging|
      json.partial! 'api/taggings/tagging', tagging: tagging
    end
  end

  json.tags do
    json.array!(story.tags) do |tag|
      json.partial! 'api/tags/tag', tag: tag
    end
  end
end
