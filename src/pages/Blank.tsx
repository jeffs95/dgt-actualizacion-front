import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import BasicTableOne from "../components/tables/BasicTables/BasicTableOne";

export default function Blank() {
  return (
    <>
      <PageBreadcrumb pageTitle="Persona" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
