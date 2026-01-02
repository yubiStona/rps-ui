type EndpointType = {
  [key: string]: string;
};


export const AdminStudentEndpoints: EndpointType = {
    GET_STUDENTS:"/students",
    GET_STUDENT_BY_ID:"/students",
    PROGRAM_LIST:"/programs/program-list",
    STUDENT_ACTION:"/students"
}

export default AdminStudentEndpoints;