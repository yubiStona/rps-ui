type EndpointType = {
  [key: string]: string;
};


export const AdminStudentEndpoints: EndpointType = {
    GET_STUDENTS:"/students",
    PROGRAM_LIST:"/programs/program-list",
    STUDENT_ACTION:"/students"
}

export default AdminStudentEndpoints;