import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface'

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

//Mapper for Semester Code Validation
export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
