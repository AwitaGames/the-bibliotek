import TagBadge from '@/components/custom-ui/tag-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type TagGroup from '@/types/tag-groups'
import type Tag from '@/types/tags'
import { X } from 'lucide-react'
import { useState } from 'react'

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
    const [textFilter, setTextFilter] = useState('')

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
            <div className="flex flex-row gap-2">
                <Input
                    type="text"
                    placeholder="Filtrar etiquetas..."
                    value={textFilter}
                    onChange={(e) => setTextFilter(e.currentTarget.value)}
                />
                <Button variant="ghost" onClick={() => setTextFilter('')}>
                    <X />
                </Button>
            </div>
            {tagGroups.map((tagGroup) => (
                <div className="flex flex-col bg-secondary rounded-xl p-3">
                    <div className="text-sm text-primary/70 font-semibold uppercase">{tagGroup.name}</div>
                    <div className="grid grid-cols-2 flex-wrap gap-1 space-x-2 mt-1">
                        {tags.map((tag) => {
                            if (tag.tag_group?.id === tagGroup.id) {
                                if (
                                    textFilter.trim() != '' &&
                                    tag.name.toLowerCase().indexOf(textFilter.toLowerCase()) < 0
                                ) {
                                    return
                                }
                                return (
                                    <TagBadge
                                        key={tag.id}
                                        tag={tag}
                                        selected={selectedTags.includes(tag.id)}
                                        onClick={onTagClick}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
