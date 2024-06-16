import { createContext, useEffect, useState } from 'react'

const AppContext = createContext({} as any)

const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [course, setCourse] = useState([])
  console.log(course)
  const [activeCourse, setActiveCourse] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function initApp() {
      setLoading(false)
    }
    initApp()
  }, [])

  const values = {
    course,
    setCourse,
    loading,
    activeCourse,
    setActiveCourse
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }