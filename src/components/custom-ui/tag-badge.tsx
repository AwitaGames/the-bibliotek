import type Tag from '@/types/tags'
import { CheckCircle } from 'lucide-react'

export default function TagBadge({
    tag,
    selected = false,
    onClick = () => {},
}: {
    tag: Tag
    selected?: boolean
    onClick?: (tag_id: string) => void
}) {
    const onTagClick = () => {
        if (onClick) {
            onClick(tag.id)
        }
    }

    return (
        <div
            key={tag.id}
            className={`flex flex-row flex-nowrap items-center gap-1 cursor-pointer text-wrap select-none border-0 p-0 font-normal hover:underline ${selected && 'font-semibold underline'}`}
            onClick={() => onTagClick()}
            style={{
                color: tag.color ? tag.color : tag.tag_group?.color,
            }}
        >
            {selected && <CheckCircle className="w-4! h-4! text-white" />}
            {tag.name}
        </div>
    )
}
