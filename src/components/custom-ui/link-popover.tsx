import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type Link from '@/types/link'
import { Info } from 'lucide-react'

export default function LinkPopover({ link }: { link: Link }) {
    return (
        <Popover>
            <PopoverTrigger>
                <Info className="text-primary/50 w-5 h-5" />
            </PopoverTrigger>
            <PopoverContent className="w-100 h-auto">
                <div className="flex flex-col gap-2 ">
                    <div className="h-auto w-full object-contain object-center overflow-hidden rounded-xl">
                        <img src={link.og_image} className="mx-auto" />
                    </div>
                    <div className="text-xs">Creado: {link.created.toLocaleString()}</div>
                    <div className="text-xs">Actualizado: {link.updated.toLocaleString()}</div>
                    <div className="font-semibold">{link.name || 'Sin nombre'} </div>
                    <div
                        className="text-wrap"
                        dangerouslySetInnerHTML={{
                            __html: link.description || 'Sin descripción',
                        }}
                    ></div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
