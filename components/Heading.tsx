import { FC } from "react"

interface HeadingProps {
    title: string,
    description: string,
}

const Heading: FC<HeadingProps> = ({title, description}) => {
  return (
    <div>
        <h2 className="text-3xl tracking-tight font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

export default Heading