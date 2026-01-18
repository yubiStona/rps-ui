import * as yup from 'yup';

export const subjectSchema = yup.object({
  name: yup.string()
    .required('Subject name is required')
    .min(2, 'Subject name must be at least 2 characters')
    .max(100, 'Subject name cannot exceed 100 characters'),

  code: yup.string()
    .required('Subject code is required')
    .min(2, 'Subject code must be at least 2 characters')
    .max(20, 'Subject code cannot exceed 20 characters'),

  credits: yup.number()
    .required('Credits are required')
    .min(0, 'Credits must be a non-negative number')
    .max(100, 'Credits cannot exceed 100')
    .integer('Credits must be a whole number')
    .typeError('Credits must be a number'),

  semester: yup.number()
    .required('Semester is required')
    .min(1, 'Semester must be between 1 and 10')
    .max(10, 'Semester must be between 1 and 10')
    .integer('Semester must be a whole number')
    .typeError('Semester must be a number'),

  type: yup.string()
    .oneOf(['theory', 'practical', 'hybrid'], 'Invalid subject type')
    .required('Type is required'),

  programId: yup.number()
    .required('Program is required')
    .min(1, 'Select a valid program'),

  teacherId: yup.number()
    .min(0, 'Select a valid teacher')
    .nullable(),
});