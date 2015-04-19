json.partial!("tag", tag: @tag)

json.taggings do
  json.array!(@tag.taggings) do |tagging|
    json.partial! 'api/taggings/tagging', tagging: tagging
  end
end

json.tagged_pubs do
  json.array!(@tag.tagged_pubs) do |pub|
    json.partial! 'api/publications/pub', pub: pub
  end
end

json.tagged_stories do
  json.array!(@tag.tagged_stories) do |story|
    json.partial! 'api/stories/story', story: story
  end
end
