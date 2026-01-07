import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Card, Button, Table, Form } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import DeleteConfirmationModal from "./Partials/DeleteConfirmationModal";
// import ProgramFormModal from "./Partials/ProgramFormModal";
// import ProgramEditModal from "./Partials/ProgramEditModal";
import { useGetProgramsQuery } from "../../../features/admin/programs/programApi";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 50];

const ProgramManagement: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null);
  const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [debouncedSearch, currentPage, itemsPerPage]
  );

  const { data: programData, isLoading: isProgramLoading, isFetching } = useGetProgramsQuery(queryParams);

  // Calculate pagination
  let startIndex = 0;
  let endIndex = 0;

  if (programData) {
    startIndex =
      programData?.total === 0
        ? 0
        : (programData?.page - 1) * programData?.limit + 1;
    endIndex = Math.min(
      programData?.page * programData?.limit,
      programData?.total
    );
  }

  // Reset to first page when filters or items per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

//   const onSubmit = async (data: ProgramFormData) => {
//     if (!data) return;
//     try {
//       const response = await addProgram(data).unwrap();
//       if (response.success) {
//         toast.success(response.message);
//         setShowFormModal(false);
//       }
//     } catch (error: any) {
//       toast.error(error?.data?.message);
//     }
//   };

  const handleEdit = (program: Program) => {
    setEditingProgramId(program.id);
    setShowEditModal(true);
  };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setEditingProgramId(null);
//   };

//   const handleUpdateProgram = async (data: ProgramFormData) => {
//     if (!data) return;
//     try {
//       const response = await editProgram({ data, id: editingProgramId }).unwrap();
//       if (response.success) {
//         toast.success(response.message);
//         setEditingProgramId(null);
//         setShowEditModal(false);
//       }
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || "Failed to edit program";
//       toast.error(errorMessage);
//     }
//   };

  const handleDeleteClick = (program: Program) => {
    setDeletingProgram(program);
    setShowDeleteModal(true);
  };

//   const handleDeleteConfirm = async () => {
//     if (!deletingProgram) return;
//     try {
//       const response = await deleteProgram(deletingProgram.id).unwrap();
//       if (response.success) {
//         toast.success(response.message);
//         setShowDeleteModal(false);
//         setDeletingProgram(null);
//       }
//     } catch (error: any) {
//       const errorMessage = error?.data?.message || "Failed to delete program";
//       toast.error(errorMessage);
//     }
//   };

//   const handleCloseFormModal = () => {
//     setShowFormModal(false);
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setDeletingProgram(null);
//   };

  const handleAddNew = () => {
    setShowFormModal(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
  };

  const clearFilters = () => {
    setSearchTerm("");
  };

  // Render pagination controls component (reusable)
  const renderPaginationControls = () => (
    <div
      className={`d-flex justify-content-between align-items-center border-top pt-3`}
    >
      {/* Items per page and showing info */}
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">Show:</span>
          <Form.Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="sm"
            className="w-auto"
            style={{ width: "80px" }}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
          <span className="text-muted small ms-2">per page</span>
        </div>
        <span className="text-muted">
          Showing {startIndex + 1}-{endIndex} of {programData?.total} programs
        </span>
      </div>

      {/* Material-UI Pagination */}
      {programData && programData?.total > 1 && (
        <Stack spacing={2}>
          <Pagination
            count={programData?.lastPage}
            page={programData?.page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            size={"medium"}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "0.875rem",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#0d6efd",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0b5ed7",
                },
              },
            }}
          />
        </Stack>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold">Program Management</h2>
            <p className="text-muted">
              Manage academic programs and information
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleAddNew}
            className="d-flex align-items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Program
          </Button>
        </div>

        {/* Search and Filters Section */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-3">
            <Row className="g-3">
              {/* Search Bar */}
              <Col md={6}>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search programs by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Col>
            </Row>

            {/* Clear Filters Button */}
            {searchTerm && (
              <div className="mt-3">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={clearFilters}
                  className="d-flex align-items-center gap-1"
                >
                  <i className="fas fa-times"></i>
                  Clear Filters
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Programs Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white py-3">
            <div className="px-3 pb-3">{renderPaginationControls()}</div>
          </Card.Header>
          <Card.Body className="p-0">
            {(isProgramLoading || isFetching) ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>SN</th>
                        <th>Program Code</th>
                        <th>Program Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programData?.data && programData?.data.length > 0 ? (
                        programData.data.map((item, key) => {
                          const serialNumber = (currentPage - 1) * itemsPerPage + key + 1;
                          return (
                            <tr key={key}>
                              <td className="fw-semibold">{serialNumber}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm bg-light rounded-circle d-flex align-items-center justify-content-center me-2">
                                    <i className="fas fa-graduation-cap text-primary"></i>
                                  </div>
                                  <div className="fw-semibold">{item.code}</div>
                                </div>
                              </td>
                              <td>
                                <div className="fw-semibold">{item.name}</div>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                    title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(item)}
                                    title="Delete"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4">
                            <div className="text-muted">
                              <i className="fas fa-inbox fa-2x mb-2"></i>
                              <p>No programs found</p>
                              {searchTerm && (
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={clearFilters}
                                >
                                  Clear search
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
            {/* Bottom pagination controls */}
            <div className="px-3 pb-3">{renderPaginationControls()}</div>
          </Card.Body>
        </Card>
      </div>

      {/* Form Modal */}
      {/* <ProgramFormModal
        show={showFormModal}
        onHide={handleCloseFormModal}
        onSubmit={onSubmit}
        isLoading={isAddingProgram}
      /> */}

      {/* Edit Modal */}
      {/* <ProgramEditModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        onSubmit={handleUpdateProgram}
        isLoading={isLoadingDetails || isFetchingDetails}
        programData={programDetailsData?.data?.[0]}
        isUpdating={isUpdatingProgram}
      /> */}

      {/* Delete Confirmation Modal
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        programName={
          deletingProgram
            ? `${deletingProgram.name} (${deletingProgram.code})`
            : ""
        }
        isLoading={isDeleting}
      /> */}
    </>
  );
};

export default ProgramManagement;