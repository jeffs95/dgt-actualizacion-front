import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import BasicTableOne from "../components/tables/BasicTables/BasicTableOne";

export default function Blank() {
  return (
    <>
      <PageBreadcrumb pageTitle="Representantes" />
      <div className="space-y-6">
        <ComponentCard title={""}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
