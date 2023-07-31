import { Button } from '@mui/material'
import { GB, TR } from 'country-flag-icons/react/3x2'
import React, { useState } from 'react'

const ChangeLanguageButton = ({changeLanguage}) => {

  const [language, setLanguage] = useState(localStorage.getItem("language"))

  const buttonClick = () => {
    changeLanguage()
    setLanguage(localStorage.getItem("language"))
  }

  return (
    <Button width={'5%'} onClick={buttonClick}>
      {language === 'en' ? <TR title="Türkçe" /> : <GB title="English" />}
    </Button>
  )
}

export default ChangeLanguageButton