import { useEffect } from "react"
import Pages from "./Pages"

function Page() {

    useEffect(() => {
        localStorage.getItem("language") === "en" ? localStorage.setItem("language", 'en') : localStorage.setItem("language", 'tr')
    }, [])

    return (
        <Pages />
    )

}
export default Page