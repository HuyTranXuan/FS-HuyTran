import { Part } from "./Part"
import { CoursePart } from "../App"

export const Content = ({ course }: { course: CoursePart }) => {
    return <Part course={course}/>
  }