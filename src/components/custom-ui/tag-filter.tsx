import TagBadge from '@/components/custom-ui/tag-badge'
import type TagGroup from '@/types/tag-groups'
import type Tag from '@/types/tags'

export default function TagFilter({
    tagGroups,
    tags,
    selectedTags,
    setSelectedTags,
}: {
    tagGroups: TagGroup[]
    tags: Tag[]
    selectedTags: string[]
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const onTagClick = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags((prev) => {
                return prev.filter((elem) => elem != tagId)
            })
        } else {
            setSelectedTags((prev) => {
                if (prev.includes(tagId)) return prev
                return [...prev, tagId]
            })
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full h-full">
            {tagGroups.map((tagGroup) => (
                <div className="flex flex-col bg-secondary rounded-xl p-3">
                    <h4 className="font-semibold uppercase">{tagGroup.name}</h4>
                    <div>{tagGroup.description}</div>

                    <div className="flex flex-row flex-wrap gap-2 mt-3">
                        {tags.map((tag) =>
                            tag.tag_group?.id === tagGroup.id ? (
                                <TagBadge
                                    key={tag.id}
                                    tag={tag}
                                    selected={selectedTags.includes(tag.id)}
                                    onClick={onTagClick}
                                />
                            ) : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
