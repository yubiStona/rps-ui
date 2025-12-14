import { Teacher } from '../types';

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    first_name: "Sarah",
    last_name: "Wilson",
    email: "sarah.wilson@university.edu",
    phone: "+1234567890",
    address1: "123 Teacher Street",
    address2: "Apt 4B",
    gender: "F",
    dob: "1985-06-15",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-15T10:30:00Z"
  },

  {
    id: 2,
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@university.edu",
    phone: "+1234567891",
    address1: "456 Professor Avenue",
    address2: null,
    gender: "M",
    dob: "1978-11-22",
    created_at: "2023-02-20T14:45:00Z",
    updated_at: "2023-02-20T14:45:00Z"
  },

  {
    id: 3,
    first_name: "Emily",
    last_name: "Johnson",
    email: "emily.johnson@university.edu",
    phone: "+1234567892",
    address1: "789 Lecturer Road",
    address2: "Block C",
    gender: "F",
    dob: "1990-03-10",
    created_at: "2023-03-10T09:15:00Z",
    updated_at: "2023-03-10T09:15:00Z"
  },

  {
    id: 4,
    first_name: "Michael",
    last_name: "Davis",
    email: "michael.davis@university.edu",
    phone: "+1234567893",
    address1: "321 Educator Lane",
    address2: "Suite 202",
    gender: "M",
    dob: "1982-09-05",
    created_at: "2023-04-05T11:20:00Z",
    updated_at: "2023-04-05T11:20:00Z"
  }
];