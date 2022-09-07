/* eslint-disable @typescript-eslint/no-explicit-any */
export const Total = ({ courseParts }: { courseParts: any }) => {
    return (
      <p>
      Number of exercises{" "}
      {courseParts.reduce((carry:number, part:any) => carry + part.exerciseCount, 0)}
    </p>
    )
  }