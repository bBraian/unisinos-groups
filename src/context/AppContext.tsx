import { createContext, useEffect, useState } from 'react'

import { parseCookies, setCookie } from 'nookies'
import { api } from '@/api/axios'
import { CourseProps } from '@/@types/Course'

const ALL_COURSES = 'all'
const SELECTED_COURSE_COOKIE = 'uni-groups.selectedCourse'

interface AppContextProps {
  courses: CourseProps[];
  loadCourses: () => Promise<void>;
  selectedCourse: string;
  setSelectedCourse: (courseId: string) => void;
  loading: boolean;
}

const AppContext = createContext({} as AppContextProps)

const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [courses, setCourses] = useState<CourseProps[]>([])
  const [selectedCourse, setSelectedCourseState] = useState(
    () => parseCookies()[SELECTED_COURSE_COOKIE] || ALL_COURSES
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      const { data } = await api.get('course')
      setCourses(data.course)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function setSelectedCourse(courseId: string) {
    setSelectedCourseState(courseId)
    setCookie(null, SELECTED_COURSE_COOKIE, courseId, {
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: '/'
    })
  }

  // Um curso salvo que deixou de existir (ex.: excluído na administração) volta para "todos"
  const isSelectedCourseValid = loading
    || selectedCourse === ALL_COURSES
    || courses.some(course => String(course.id) === selectedCourse)

  const values = {
    courses,
    loadCourses,
    selectedCourse: isSelectedCourseValid ? selectedCourse : ALL_COURSES,
    setSelectedCourse,
    loading
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider, ALL_COURSES }
