import { useEffect, useState } from "react"
import Pages from "./Pages"

function Page() {

    const [firstLoad, setFirstLoad] = useState(false)

    useEffect(() => {
        const currentLang = localStorage.getItem("language")
        localStorage.setItem("language", currentLang === "tr" ? "tr" : "en")
        setFirstLoad(true)
    }, [])

    return (<>
        {firstLoad && <Pages/>}
    </>
    )

}
export default Page