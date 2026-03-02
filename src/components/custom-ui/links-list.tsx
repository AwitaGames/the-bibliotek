import LinkPopover from '@/components/custom-ui/link-popover'
import TagBadge from '@/components/custom-ui/tag-badge'
import { usePocketbase } from '@/pocketbase/PocketbaseContext'

export default function LinksList() {
    const { links } = usePocketbase()

    return (
        <div className="w-full px-5 flex flex-col gap-5 justify-center mx-auto">
            <div className="flex flex-col gap-5 rounded-lg overflow-hidden">
                <div>
                    {links.map((link) => {
                        return (
                            <div className={`flex flex-row gap-10 duration-250 hover:p-2 hover:bg-secondary`}>
                                <div className="flex flex-row gap-5 w-[40%]">
                                    <LinkPopover link={link} />

                                    <a href={link.url} className="hover:underline" target="_blank">
                                        <span className="text-lg">{link.name || ''} </span>
                                    </a>
                                </div>
                                <div key={link.id} className="flex flex-wrap gap-1 items-center">
                                    {link.tags.map((tag, idx) => {
                                        return (
                                            <TagBadge
                                                key={tag.id}
                                                tag={tag}
                                                append={idx < link.tags.length - 1 ? ',' : ''}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
