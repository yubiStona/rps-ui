import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

export interface DropdownOption<T = string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SearchableDropdownProps<T = string | number> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  error?: string;
  className?: string;
  id?: string;
}

const SearchableDropdown = <T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  disabled = false,
  enableSearch = true,
  searchPlaceholder = "Search...",
  error,
  className = "",
  id,
}: SearchableDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption<T>[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`position-relative ${className}`} ref={dropdownRef} id={id}>
      {label && (
        <Form.Label className="fw-semibold">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      
      <div className={`dropdown ${isOpen ? "show" : ""}`}>
        <button
          type="button"
          className={`form-select text-start ${error ? "is-invalid" : ""} ${disabled ? "bg-light" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          style={{ 
            cursor: disabled ? "not-allowed" : "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {selectedOption ? selectedOption.label : (
            <span className="text-muted">{placeholder}</span>
          )}
        </button>

        {isOpen && !disabled && (
          <div 
            className="dropdown-menu show w-100 border-0 shadow-lg p-0"
            style={{ 
              maxHeight: "300px", 
              overflowY: "auto",
              zIndex: 1050 
            }}
          >
            {/* Search input */}
            {enableSearch && options.length > 5 && (
              <div className="p-2 border-bottom sticky-top bg-white">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      className="input-group-text bg-light border-0"
                      onClick={() => setSearchTerm("")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    className={`dropdown-item ${value === option.value ? "active bg-primary" : ""}`}
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    style={{ 
                      cursor: option.disabled ? "not-allowed" : "pointer",
                      opacity: option.disabled ? 0.5 : 1 
                    }}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="text-center py-3 text-muted">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;