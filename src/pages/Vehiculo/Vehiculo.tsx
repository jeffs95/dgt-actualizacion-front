import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Table from "../../components/tables/Persona/Table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Vehiculo() {
  return (
    <>
      <PageMeta
        title="DGT-ACTUALIZACION"
        description="Proyecto actualizacion front"
      />
      <PageBreadcrumb pageTitle="Vehiculos" />
      <div className="space-y-6">
        <ComponentCard title={""}>
          <Table />
        </ComponentCard>
      </div>

    </>
  );
}
