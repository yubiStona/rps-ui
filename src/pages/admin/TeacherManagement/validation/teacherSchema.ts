import * as yup from 'yup'

export const teacherSchema = yup.object({
    firstName: yup
        .string()
        .required('First name is required.')
        .matches(/^[A-Za-z\s]+$/, 'First name can only contain letters and spaces.'),
    lastName: yup
        .string()
        .required('Last name is required.')
        .matches(/^[A-Za-z]+$/, 'Last name can only contain letters.'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address.')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Email format is invalid.'
        ),
    phone: yup
        .string()
        .required('Phone number is required.')
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .test('phone-length', 'Phone number must be 10 digits.', (value) => {
            if (!value) return true; // optional field
            const digitsOnly = value.replace(/\D/g, '');
            return digitsOnly.length === 10;
        })
        .test('phone-numeric', 'Phone number must contain only numbers.', (value) => {
            if (!value) return true; // optional field
            return /^\d+$/.test(value.replace(/\s/g, ''));
        }),
        gender: yup
            .mixed<'M' | 'F' | 'O'>() // Use mixed with specific literal types
            .required('Gender is required.')
            .oneOf(['M', 'F', 'O'], 'Invalid gender selection.'),
    DOB: yup
        .string()
        .required('Date of birth is required.')
        .test('past-date', 'Date of birth must be in the past.', (value) => {
            if (!value) return false;
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate < today;
        }),
    address1: yup
        .string()
        .required('Address is required.'),
});

export const teacherEditSchema = yup.object({
    firstName: yup
        .string()
        .optional()
        .matches(/^[A-Za-z\s]*$/, 'First name can only contain letters and spaces.'),
    lastName: yup
        .string()
        .optional()
        .matches(/^[A-Za-z]*$/, 'Last name can only contain letters.'),
    email: yup
        .string()
        .optional()
        .email('Invalid email address.')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Email format is invalid.'
        ),
    phone: yup
        .string()
        .optional()
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .test('phone-length', 'Phone number must be 10 digits.', (value) => {
            if (!value || value.trim() === '') return true; // optional field
            const digitsOnly = value.replace(/\D/g, '');
            return digitsOnly.length === 10;
        })
        .test('phone-numeric', 'Phone number must contain only numbers.', (value) => {
            if (!value || value.trim() === '') return true; // optional field
            return /^\d+$/.test(value.replace(/\s/g, ''));
        }),
    gender: yup
        .mixed<'M' | 'F' | 'O'>()
        .optional()
        .oneOf(['M', 'F', 'O', undefined], 'Invalid gender selection.'),
    DOB: yup
        .string()
        .optional()
        .nullable()
        .test('past-date', 'Date of birth must be in the past.', (value) => {
            if (!value || value.trim() === '') return true; // optional field
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate < today;
        }),
    address1: yup
        .string()
        .optional()
        .nullable(),
});