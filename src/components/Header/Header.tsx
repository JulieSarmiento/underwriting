export default function Header({title, description}: {title: string, description: string}) {
    return (
        <>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
        </>
    )
}