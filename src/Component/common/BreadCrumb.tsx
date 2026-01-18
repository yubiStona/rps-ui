import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

interface BreadCrumbItem {
  label: string;
  link?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

interface CommonBreadCrumbProps {
  items: BreadCrumbItem[];
  title?: string;
}

const CommonBreadCrumb: React.FC<CommonBreadCrumbProps> = ({
  items,
  title,
}) => {
  return (
    <div className="ms-2 mt-1">
      {title && <h4 className="fw-bold mb-2">{title}</h4>}
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            active={item.active}
            linkAs={item.link ? Link : undefined}
            linkProps={
              item.link
                ? {
                    to: item.link,
                    className: "text-decoration-none fw-semibold text-primary",
                  }
                : undefined
            }
          >
            {item.icon && <span className="me-2">{item.icon}</span>}
            {item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default CommonBreadCrumb;
