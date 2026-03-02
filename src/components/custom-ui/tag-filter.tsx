import TagBadge from '@/components/custom-ui/tag-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePocketbase } from '@/pocketbase/PocketbaseContext'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function TagFilter() {
    const [textFilter, setTextFilter] = useState('')
    const { tagGroups, tags } = usePocketbase()

    return (
        <div className="flex flex-col gap-3 w-full h-full">
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
                <div className="flex flex-col">
                    <div className="text-sm text-primary/70 font-semibold uppercase">{tagGroup.name}</div>
                    <div className="flex flex-row flex-wrap gap-1 space-x-2 mt-1">
                        {tags.map((tag) => {
                            if (tag.tag_group?.id === tagGroup.id) {
                                if (
                                    textFilter.trim() != '' &&
                                    tag.name.toLowerCase().indexOf(textFilter.toLowerCase()) < 0
                                ) {
                                    return
                                }
                                return <TagBadge key={tag.id} tag={tag} />
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
