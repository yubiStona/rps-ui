import * as yup from 'yup';

export const programSchema = yup.object({
    name: yup.string()
        .required('Program name is required')
        .min(3, 'Program name must be at least 3 characters')
        .max(100, 'Program name cannot exceed 100 characters'),
    
    code: yup.string()
        .required('Program code is required')
        .min(2, 'Program code must be at least 2 characters')
        .max(10, 'Program code cannot exceed 10 characters')
        .matches(/^[A-Z0-9]+$/, 'Program code can only contain uppercase letters and numbers'),
    
    facultyId: yup.string().required('Faculty is required'),
    
    hodId: yup.string().required('Head of Department is required'),
    
    totalSemesters: yup.number()
        .required('Total semesters is required')
        .min(1, 'Must have at least 1 semester')
        .max(20, 'Cannot exceed 20 semesters')
        .integer('Must be a whole number'),
    
    totalSubjects: yup.number()
        .required('Total subjects is required')
        .min(1, 'Must have at least 1 subject')
        .max(200, 'Cannot exceed 200 subjects')
        .integer('Must be a whole number'),
    
    totalCredits: yup.number()
        .required('Total credits is required')
        .min(1, 'Must have at least 1 credit')
        .max(500, 'Cannot exceed 500 credits')
        .positive('Credits must be positive'),
    
    durationInYears: yup.number()
        .required('Duration is required')
        .min(1, 'Duration must be at least 1 year')
        .max(10, 'Duration cannot exceed 10 years')
        .integer('Must be a whole number'),
});