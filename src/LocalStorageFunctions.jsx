
const LocalStorageDelete= () => {
    localStorage.setItem("userToken", "")
    localStorage.setItem("userId", null)
    localStorage.setItem("role", "")
    localStorage.setItem("name", "")
    localStorage.setItem("surname","")
    localStorage.setItem("email" ,"")
    localStorage.setItem("department", "")
}

export default LocalStorageDelete