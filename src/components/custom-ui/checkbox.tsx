import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function CustomCheckbox({
    inputId,
    value,
    onChange,
    text,
}: {
    inputId: string
    text: string
    value: boolean
    onChange: (isChecked: boolean) => void
}) {
    return (
        <div className="flex items-center gap-3">
            <Checkbox id={inputId} checked={value} onCheckedChange={(isChecked) => onChange(!!isChecked)} />
            <Label className="font-normal" htmlFor="terms">
                {text}
            </Label>
        </div>
    )
}
